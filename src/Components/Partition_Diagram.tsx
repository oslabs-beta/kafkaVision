import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '../App';


const Partition_Diagram = () => {
  //unpacking state from context
  const {
    state: { globalState, connectionState },
  } = useContext(appContext);

  // local state which will be an array that gets filled by fetch
  const [localPartitionState, setLocalPartitionState] = useState(
    globalState.kafka_partitions
  );

  // creating elements for each partition of a certain topic (topic is selected in parent element)
  let renderedContent: JSX.Element[] = [];
  for (let i = 0; i < localPartitionState.length; i += 1) {
    renderedContent.push(
      <div className="bg-zinc-800 h-9 border border-fontGray/40 text-sm text-seafoam/50 rounded flex flex-row justify-around w-full">
        <div>Partition Number: {localPartitionState[i].partition} </div>
        <div>Offset: {localPartitionState[i].offset} </div>
        <div>High: {localPartitionState[i].high} </div>
        <div>Low: {localPartitionState[i].low} </div>
      </div>
    );
  }

  // fetch offset data on page load using topic name from global state (kafka_topics)
  // which topic is queried is determined by global state 'selected_kafka_topic_index' (set in parent 'RelationshipsContainer')
  useEffect(() => {
    fetch('/api/kafka/topicoffsets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bootstrap: `${connectionState.url_kafka}`,
        topic: `${
          globalState.kafka_topics[globalState.selected_kafka_topic_index - 1]
        }`,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLocalPartitionState(data);
      })
      .catch((err) => console.log(`error getting topic offset info: ${err}`));
    return;
  }, [globalState]);

  return (
    <div className="h-full w-full">
      {renderedContent}
    </div>
  );
};

export default Partition_Diagram;
