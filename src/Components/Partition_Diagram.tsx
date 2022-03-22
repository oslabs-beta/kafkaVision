import React, {useContext, useEffect, useState} from 'react';
import { appContext } from '../App';

const height_adjustable = 600;
const width_adjustable = 950;

const Partition_Diagram= () => {    
    // const global_state = useContext(globalStateContext);
    // const {globalState, setGlobalState} = useContext(globalStateContext);
    const appState = useContext(appContext);
    const [globalState, setGlobalState] = appState.global;
    const [connectionState, setConnectionState] = appState.connection;
    // console.log("partition diagram rerendered")
    // console.log(globalState)
    const [localPartitionState, setLocalPartitionState] = useState(globalState.kafka_partitions)
    // console.log(localPartitionState);
    console.log("local partitions", localPartitionState)
    let renderedContent = [];
    for (let i = 0 ; i<localPartitionState.length; i+=1){
        renderedContent.push(
        <div className="bg-green-500 h-12 border text-lg font-bold rounded flex flex-row justify-around w-full">
            <div>Partition Number: {localPartitionState[i].partition} </div>
            <div>Offset: {localPartitionState[i].offset} </div>
            <div>High: {localPartitionState[i].high} </div>
            <div>Low: {localPartitionState[i].low} </div>
        </div>)
    }


    useEffect(() => {
        fetch('/api/kafka/topicoffsets', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({bootstrap:`${connectionState.url_kafka}`, topic:`${globalState.kafka_topics[globalState.selected_kafka_topic_index-1]}`})
        })
        .then(data => data.json())
        .then(data => {
            console.log("got offset info from topic fetch")
            console.log(data)
            setLocalPartitionState(data);
            // setGlobalState((prevstate:any) => {return {...prevstate, kafka_partitions: data}});
        })
        .catch( err => console.log("error getting topic offset info"))
        return
    }, [globalState])

    return(
        <div className="bg-green-600 h-full w-full">
            {renderedContent}
            {/* <div className=" h-full w-full"> Hiya {JSON.stringify(localPartitionState)} </div> */}
        </div>   
         )
}

export default Partition_Diagram;