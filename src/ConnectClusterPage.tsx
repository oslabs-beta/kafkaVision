import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { appContext } from './App';

const ConnectClusterPage = () => {
  //unpack state 
  const {
    state: { connectionState, globalState }, actions: { setConnectionState, setGlobalState },
  } = useContext(appContext);

  // local state & methods used to capture user's typing character-by-character
  const [url_kafka_input, setKafka] = useState('');
  const [url_prometheus_input, setProm] = useState('');
  const handleKafkaInput = (event: any) => {
    setKafka(event.target.value);
  };
  const handlePromInput = (event: any) => {
    setProm(event.target.value);
  };

  const [show_error_kafka, setErrorKafka] = useState(false);
  const [show_error_prom, setErrorProm] = useState(false);

  // used for routing
  const history = useHistory();
  // state below used for fetch req to get partitions after kafka_url is updated
  const doneRendering = useRef(false);
  const [haveKafkaURL, setHaveKafkaURL] = useState(false);

  // method to handle making a fetch for list of topics when kafkaJS cluster connects and routing to Relationships page
  // should not be triggered on initial load - 'doneRendering' used to prevent this
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
      doneRendering.current = true;
    }
  }, [haveKafkaURL]);

  // method invoked when user clicks 'Connect' for kafkaJS... saves URL in global state if good URL
  // if bad URL,it will not save URL in state & instead show error message
  function verify_kafka() {
    fetch('/api/kafka/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bootstrap: `${url_kafka_input}` }),
    })
      .then(data=> data.json())
      .then(data => {
        // if it is verified
        setConnectionState((prevState: any) => {
          return { ...prevState, url_kafka: url_kafka_input, isConnected: true, valid_kafka_url: true };
        });
        setGlobalState((prevstate: any) => {
          return { ...prevstate, sidebarTab: 2 };
        });
        setErrorKafka(() => {
          return false;
        })
        // trigger useEffect fetch above to get topics list and then route to next page
        setHaveKafkaURL(true);
        // route to next page
        history.push('/componentRelationships');
      })
      .catch( err => {
        console.log("Invalid Kafka cluster. ERROR:", err)
        setErrorKafka(() => {
          return true;
        })
      })
  }

  // method invoked when user clicks 'Connect' for prometheus connection
  function verify_prom() {
    const queryParams = 'api/v1/query?query=';
    const query = 'irate(process_cpu_seconds_total[5m])*100';
    const fullFetch = url_prometheus_input + queryParams + query
    fetch(fullFetch)
    // save URL in global state and route to '/health' page
      .then(data=> data.json())
      .then(data => {
        console.log("prom query string good")
        setConnectionState((prevState: any) => {
          return { ...prevState, url_prometheus:url_prometheus_input, isConnected: true, valid_prom_url: true };
        });
        setGlobalState((prevstate: any) => {
          return { ...prevstate, sidebarTab: 1 };
        });
        setErrorProm(() => {
          return false;
        })
        history.push('/health');
      })
      .catch( err => {
        console.log("test query string came back false!");
        setErrorProm(() => {
          return true;
        })
      })
  }
  

  return (
    <div className="flex flex-col text-fontGray/70 border rounded border-limeGreen/70 m-10 bg-gray-800">
      <div className="flex place-content-center font-bold text-xl m-5 text-fontGray-75">
        <h1>Choose a method to connect to your Kafka Cluster</h1>
      </div>
      <div className="border rounded m-10 border-seafoam/80 bg-slateBlue/80">
        <div className="flex place-content-center">
          <label className="self-center" htmlFor="urlKafka">
            Enter Broker port:{' '}
          </label>
          <input
            role="input_kafka"
            onChange={handleKafkaInput}
            placeholder="Kafka Broker Port"
            name="urlKafka"
            id="urlKafka"
            value={url_kafka_input}
            className="m-7 rounded bg-slateBlue border border-limeGreen/80"
            type="text"
            autoComplete="off"
          ></input>
          <button
            role="button"
            className="self-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
            onClick={(e) => {
              e.preventDefault();
              setKafka('');
              verify_kafka();
            }}
          >
            Submit
          </button>
          {show_error_kafka&& <div className="text-red-900 text-lg">Please enter a valid Kakfa URL</div>}
        </div>
        <div className="flex place-content-center">
          <label className="self-center" htmlFor="urlProm">
            Enter Prometheus port:{' '}
          </label>
          <input
            role='input_prometheus'
            onChange={handlePromInput}
            className="m-5 rounded bg-slateBlue border border-limeGreen/80 "
            placeholder="Prometheus Port"
            name="urlProm"
            type-="text"
            autoComplete="off"
            value={url_prometheus_input}
          ></input>
          <button
            role="button"
            className="self-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
            onClick={(e) => {
              e.preventDefault();
              setProm('');
              verify_prom();
            }}
          >
            Submit
          </button>
        </div>
        {show_error_prom && <div className="text-red-600 text-lg mx-0 px-0 text-center">Please enter a valid Prometheus URL</div>}
      </div>
    </div>
  );
};

export default ConnectClusterPage;
