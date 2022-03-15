import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import FlowChart from '../Components/FlowChart.jsx';
import BrokerDiagram from '../Components/brokerDiagram';
import { globalStateContext } from '../App';

//Don't forget to change this!!
const queryLink = 'https://9090-kayhill-cpdemo-u6pja23ru48.ws-us34.gitpod.io/api/v1/query?query=';
let query = '';

const RelationshipsContainer = () => {
  const {globalState, setGlobalState} = useContext(globalStateContext);

  const options = [];
  for (let i = 1; i <= globalState.coreData.length; i +=1){
      options.push(<option value={i}> {globalState.coreData[i-1].topic}</option>)
  }

  const reqParamBroker = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      query: `count(kafka_server_replicamanager_leadercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})`
    }),
  }

  useEffect(() => {
    query = '1/api/v1/query?query=count(kafka_server_replicamanager_leadercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';
    fetch(queryLink + query, reqParamBroker)
      .then(data => data.json())
      .then(data => {
        console.log('ROB DATA: ', data) 
      })
      .catch(e => {
        console.log('ERROR IN RELATIONSHIP QUERY USEEFFECT: ', e);
      })
  }, []);

  return(
    <div className='flex-auto justify-center'>
      <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75"> 
        <h1 className="font-bold text-xl m-4 text-center">Cluster Relations</h1>  

        <div className="border-2 border-seafoam/40 rounded m-5 bg-slateBlue/50">
          <p className='m-3'>Please Select a Topic:</p>

          {/* Drop Down Menu */}
          <select onChange={e => setGlobalState( (prevState: any) => { return  {...prevState, selectedState: e.target.value}})} className="text-sm text-left mx-5 border border-limeGreen/50 rounded bg-zinc-900" name="topic" id="topic">
              {/* <option value="topic1"> Topic 1 </option>
              <option value="topic2"> Topic 2 </option>
              <option value="topic3"> Topic 3 </option> */}
              {options}
          </select>

          <div className='border border-slateBlue rounded m-3 bg-zinc-800'>
            <p>cluster graph</p>
          </div>
        </div>

        <div>
            {/* <Link to="/connectCluster"> Connect Cluster Page </Link>
            <Link to="/health"> Health Metrics Page </Link>
            <Link to="/"> Login Page </Link> */}
        </div>
      </div>
      <div>
        <FlowChart />
      </div>
      <div>
        <BrokerDiagram />
      </div>
    </div>
  )
}

export default RelationshipsContainer