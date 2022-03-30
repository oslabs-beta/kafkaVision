import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Partition_Diagram from '../Components/Partition_Diagram';
// import BrokerDiagram from '../Components/brokerDiagram';
import { appContext } from '../App';

const RelationshipsContainer = () => {
  //UNPACKING STATE:
  const {
    state: { connectionState, globalState },
    actions: { setGlobalState },
  } = useContext(appContext);
  // BELOW - toggle whether diagram renders based on whether user has chosen a topic yet in dropdown
  const topic_chosen = useRef(false);

  const options = [];
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

  let rendered_diagram: any;
  if (topic_chosen.current) {
    rendered_diagram = <Partition_Diagram />;
  } else {
    rendered_diagram = '';
  }

  let renderedContent: any;
  if (!connectionState.isConnected) {
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
    renderedContent = (
      <div className="flex-auto justify-center h-full">
        <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75 h-full">
          <h1 className="font-bold text-xl m-4 text-center">
            Cluster Relations
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
