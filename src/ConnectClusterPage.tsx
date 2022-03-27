import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { appContext } from './App';

const ConnectClusterPage = () => {
  //UNPACKING STATE:
  const {
    state: { connectionState, globalState },
  } = useContext(appContext);
  const {
    actions: { setConnectionState, setGlobalState },
  } = useContext(appContext);

  const [url_kafka, setKafka] = useState('');
  const [url_prometheus, setProm] = useState('');
  const history = useHistory();
  // state below used for fetch req to get partitions after kafka_url is updated
  const doneRendering = useRef(false);
  const [haveKafkaURL, setHaveKafkaURL] = useState(false);
  // const [haveTopicsList, setHaveTopicsList] = useState(false);

  useEffect(() => {
    if (doneRendering.current) {
      console.log('in first use effect cascade');
      fetch('/api/kafka/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bootstrap: `${connectionState.url_kafka}` }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log('got topics list w/ first cascade fetch');
          console.log(data);
          setGlobalState((prevstate: any) => {
            return { ...prevstate, kafka_topics: data, sidebarTab: 2 };
          });
          history.push('/componentRelationships'); // move?
        })
        .catch((err) => console.log('error getting topics list'));
    } else {
      console.log('passing through haveURL useeffect');
      doneRendering.current = true;
    }
  }, [haveKafkaURL]);

  const handleKafkaInput = (event: any) => {
    setKafka(event.target.value);
  };

  const handlePromInput = (event: any) => {
    setProm(event.target.value);
  };

  function saveProm(url_prometheus: String) {
    fetch('/api/user/saveprom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url_prometheus,
        id: globalState.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // CHECK THE CONNECTION LATER
        setConnectionState((prevState: any) => {
          return { ...prevState, url_prometheus, isConnected: true };
        });

        setGlobalState((prevstate: any) => {
          return { ...prevstate, sidebarTab: 1 };
        });
        history.push('/health'); // move?
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveKafka(url_kafka: String) {
    fetch('/api/user/savekafka', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url_kafka,
        id: globalState.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setConnectionState((prevState: any) => {
            return { ...prevState, url_kafka, isConnected: true };
          });
          // trigger fetch cascade (first, get topics)
          setHaveKafkaURL(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="flex flex-col text-fontGray/70 border rounded border-limeGreen/70 m-10 bg-gray-800">
      <div className="flex place-content-center font-bold text-xl m-5 text-fontGray-75">
        <h1>Connect Kafka Cluster</h1>
      </div>
      <div className="border rounded m-10 border-seafoam/80 bg-slateBlue/80">
        <div className="flex place-content-center">
          <label className="self-center" htmlFor="urlKafka">
            Enter Broker port:{' '}
          </label>
          <input
            onChange={handleKafkaInput}
            placeholder="Kafka Broker Port"
            name="urlKafka"
            id="urlKafka"
            value={url_kafka}
            className="m-7 rounded bg-slateBlue border border-limeGreen/80"
            type="text"
          ></input>
          <button
            className="self-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
            onClick={(e) => {
              e.preventDefault();
              saveKafka(url_kafka);
              setKafka('');
            }}
          >
            Submit
          </button>
        </div>
        <div className="flex place-content-center">
          <label className="self-center" htmlFor="urlProm">
            Enter Prometheus port:{' '}
          </label>
          <input
            onChange={handlePromInput}
            className="m-5 rounded bg-slateBlue border border-limeGreen/80 "
            placeholder="Prometheus Port"
            name="urlProm"
            type-="text"
            value={url_prometheus}
          ></input>
          <button
            className="self-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
            onClick={(e) => {
              e.preventDefault();
              saveProm(url_prometheus);
              setProm('');
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectClusterPage;
