import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Partition_Diagram from '../Components/Partition_Diagram';
import { appContext } from '../App';

const RelationshipsContainer = () => {
  //Unpack state
  const {
    state: { connectionState, globalState },
    actions: { setGlobalState },
  } = useContext(appContext);

  // 'topic_chosen' used to track whether the parition list will show on page; won't show on first load
  const topic_chosen = useRef(false);

  // create list of options in dropdown menu
  const options: JSX.Element[] = [];
  for (let i = 1; i <= globalState.kafka_topics.length; i += 1) {
    if (i === 1)
      options.push(
        <option value={0} key={0}>
          {' '}
          Choose Topic{' '}
        </option>
      );
    options.push(
      <option value={i} key={i}>
        {' '}
        {globalState.kafka_topics[i - 1]}
      </option>
    );
  }

  // if first interaction on page (topic_chosen=0), don't render paritions since no topic selected yet
  let rendered_diagram: JSX.Element | string;
  if (topic_chosen.current) {
    rendered_diagram = <Partition_Diagram />;
  } else {
    rendered_diagram = '';
  }

  // 'renderedContent' will hold all JSX elements; based on connectionState, there are 3 CASES it could be:
  let renderedContent: JSX.Element;
  if (!connectionState.isConnected) {
    // CASE 1) if there is no connection at all...
    renderedContent = (
      <div className="flex-auto justify-center">
        <div className=" m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect to your
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 };
              })
            }
          >
            {' '}
            Cluster{' '}
          </Link>
          to see this page
        </div>
      </div>
    );
  } else if (connectionState.isConnected && !connectionState.valid_kafka_url){
    // CASE 2) if there is a Prometheus connection (should be kafkaJS connection)
    renderedContent = (
      <div className="flex-auto justify-center">
        <div className=" m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect using a
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 };
              })
            }
          >
            {' '}
            Kafka Broker Connection{' '}
          </Link>
          to see this page
        </div>
      </div>
    );
  }
  else if (connectionState.isConnected && connectionState.valid_kafka_url) {
    // CASE 3) if there is a good kafkaJS connection (expected)
    renderedContent = (
      <div className="flex-auto justify-center h-full">
        <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75 h-full">
          <h1 className="font-bold text-xl m-4 text-center">
            Partition Offsets
          </h1>
          <div className="border-2 border-seafoam/40 rounded m-5 bg-slateBlue/50">
            <p className="m-3">Please Select a Topic:</p>
            <select
              onChange={(e) => {
                topic_chosen.current = true;
                setGlobalState((prevState: any) => {
                  return {
                    ...prevState,
                    selected_kafka_topic_index: Number(e.target.value),
                  };
                });
              }}
              className="text-sm text-left mx-5 border border-limeGreen/50 rounded bg-zinc-900"
              name="topic"
              id="topic"
            >
              {options}
            </select>
            <div className="flex p-6 h-full, w-full">{rendered_diagram}</div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div>
      {renderedContent}
    </div>
  )
}

export default RelationshipsContainer;
