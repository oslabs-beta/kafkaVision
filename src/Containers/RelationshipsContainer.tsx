import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import FlowChart from '../Components/FlowChart.jsx';
import BrokerDiagram from '../Components/brokerDiagram';
import { appContext } from '../App';

//Don't forget to change this!!
//const queryLink = 'https://9090-kayhill-cpdemo-u6pja23ru48.ws-us34.gitpod.io/api/v1/query?query=';
let query = '';

const RelationshipsContainer = () => {
  //UNPACKING STATE:
  const appState = useContext(appContext);
  const [connectionState, setConnectionState] = appState.connection;
  const [globalState, setGlobalState] = appState.global;

  const options = [];
  for (let i = 1; i <= globalState.coreData.length; i +=1){
      options.push(<option value={i}> {globalState.coreData[i-1].topic}</option>)
  }

  let renderedContent: any;
  if (!connectionState.isConnected){
    renderedContent = (
      <div className='flex-auto justify-center'>
        <div className=" m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect to your <Link className="text-slate-100 font-bold" to='/connectCluster' onClick={() => setGlobalState((prevState:any) => {return {...prevState, sidebarTab:0}})}>Cluster</Link> to see this page
        </div>
      </div>
      )
  } else {
    renderedContent = (
      <div className='flex-auto justify-center'>
        <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75"> 
          <h1 className="font-bold text-xl m-4 text-center">Cluster Relations</h1>  
          <div className="border-2 border-seafoam/40 rounded m-5 bg-slateBlue/50">
            <p className='m-3'>Please Select a Topic:</p>
            <select onChange={e => setGlobalState( (prevState: any) => { return  {...prevState, selectedState: e.target.value}})} className="text-sm text-left mx-5 border border-limeGreen/50 rounded bg-zinc-900" name="topic" id="topic">
              {options}
            </select>
            <div className='flex p-6 h-60, w-80'>
              <FlowChart />
            </div>
          </div>
        </div>
        
      </div>
      )
  }

  // FETCH NOT NEEDED HERE - MIGHT PUT BACK IN?
  // const reqParamBroker = {
  //   method: "POST", 
  //   headers: {
  //     "Content-Type": "application/json"
  //   }, 
  //   body: JSON.stringify({
  //     query: `count(kafka_server_replicamanager_leadercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})`
  //   }),
  // }

  // useEffect(() => {
  //   query = '1/api/v1/query?query=count(kafka_server_replicamanager_leadercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';
  //   fetch(queryLink + query, reqParamBroker)
  //     .then(data => data.json())
  //     .then(data => {
  //       console.log('ROB DATA: ', data) 
  //     })
  //     .catch(e => {
  //       console.log('ERROR IN RELATIONSHIP QUERY USEEFFECT: ', e);
  //     })
  // }, []);

  return(
    <div>
      {renderedContent}
    </div>
  )
}

export default RelationshipsContainer