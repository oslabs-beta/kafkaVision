import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HealthMetricsChart from '../chartComponents/HealthMetricsChart';

//Don't forget to change the query link!
const queryLink = 'https://9090-kayhill-cpdemo-4gbgmdfwzzh.ws-us34.gitpod.io/api/v1/query?query='; //TUESDAY 3PM
const queryRange = '';
let query = '';
 

const HealthMetricsContainer = () => {  
  const [topics, setTopics] = useState(0);
  const [controllers, setControllers] = useState(0);
  const [brokers, setBrokers] = useState(0);
  const [partitions, setPartitions] = useState(0);
  const [underReplicated, setUnderReplicated] = useState(0);
  


  //CONTROLLERS
  useEffect(() => {
    //active controllers query
    const query = 'kafka_controller_kafkacontroller_activecontrollercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"} > 0';
    const data = {
      method: 'GET', 
      headers: {'Content-Type': 'application/json'}, 
    }
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        // console.log('CONTROLLERS QUERY DATA: ', result);
        // console.log('CHECKING VALUE: ', result.data.result[0].value[1]);
        setControllers(result.data.result[0].value[1]);
      })
      .catch(err => {
        console.log('ERROR IN CONTROLLERS USEEFFECT: ', err);
      })
  }, [controllers]);
  


  //BROKERS
  useEffect(() => {
    //brokers online query
    const query = 'count(kafka_server_replicamanager_leadercount{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';
    const data = {
      method: 'GET', 
      headers: {'Content-Type': 'application/json'}, 
    }
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        // console.log('BROKERS QUERY DATA: ', result);
        // console.log('CHECKING VALUE: ', result.data.result[0].value[1]);
        setBrokers(result.data.result[0].value[1]);
      })
      .catch(err => {
        console.log('ERROR IN BROKERS USEEFFECT: ', err);
      })
  }, [brokers])


  //PARTITION COUNT
  useEffect(() => {
    query = 'sum(kafka_controller_kafkacontroller_globalpartitioncount{job="kafka-broker",env=~"dev"})';
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        // console.log('PARTITION COUNT QUERY: ', result);
        setPartitions(result.data.result[0].value[1]);
      })
      .catch(err => {
        console.log('ERROR IN PARTITION COUNT USEEFFECT: ', err);
      });
  }, [partitions]);


  //TOPIC COUNT
  useEffect(() => {
    query = 'sum(kafka_controller_kafkacontroller_globaltopiccount{job="kafka-broker",env=~"dev"})';
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        // console.log('TOPICS COUNT QUERY: ', result);
        setTopics(result.data.result[0].value[1]);
      })
      .catch(err => {
        console.log('ERROR IN TOPICS COUNT USEEFFECT: ', err);
      });
  }, [topics]);

  //TOPICS DROP DOWN MENU
  const options = [];
  for (let i = 1; i <= topics; i +=1){
        options.push(<option value="topic{i}"  key={i}> Topic {i} </option>)
  };
 


  //UNDERREPLICATED PARTITIONS
  useEffect(() => {
    query = 'sum(kafka_server_replicamanager_underreplicatedpartitions{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        // console.log('UNDER REPLICATED PARTITIONS QUERY: ', result);
        setUnderReplicated(result.data.result[0].value[1]);
      })
      .catch(err => {
        console.log('ERROR IN UNDER REPLICATED PARTITIONS USEEFFECT: ', err);
      });
  }, [underReplicated]);


  return(
    <div className='flex-auto justify-center'>
      <div className="font-bold text-xl text-center height-max m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75"> 
        <h2 className="m-4 text-center">Health Dashboard</h2>
          <div className="border-2 border-seafoam/40 rounded m-5 grid grid-rows-2  bg-slateBlue/50">

            {/* Overall Cluster Health */}
            <div className='rounded m-5 border border-slateBlue bg-zinc-800'>
              <p className='m-3'>Overall Cluster Health</p>
              <div className='flex items-center justify-center m-8'>
               <HealthMetricsChart/>
              </div>
            </div>

            {/* Topic Metrics */}
            <div className='border border-slateBlue rounded m-5 bg-zinc-800'>
              <p className='m-3'>Topic Metrics</p>
              
    
              {/* Drop Down Menu */}
              <div className='text-sm text-left mx-5'>
                <p>Please Select a Topic:</p>
                <select className='my-1 bg-zinc-900 border rounded border-slateBlue' name="topic" id="topic">
                  {/* <option value="topic1"> Topic 1 </option>
                  <option value="topic2"> Topic 2 </option>
                  <option value="topic3"> Topic 3 </option> */}
                  {options}
                </select>
            
                {/* List of metrics */}
                <ul className='bg-buttonC-300 rounded my-2 p-4 text-sm font-light divide-y-2 divide-fontGray/50'>
                  {/* text placeholders */}
                  <li>Global Topic Count: {topics}</li>
                  <li>Global Online Partitions: {partitions} </li>
                  <li>Active Controllers: {controllers}</li>
                  <li>Brokers Online: {brokers}</li>
                  <li>Under Replicated Partitions: {underReplicated}</li>
                </ul>
              </div> 
            </div>

          </div>
          <div>
              {/* <Link to="/connectCluster"> Connect Cluster Page </Link>
              <Link className="bg-white" to="/"> Login Page </Link>
              <Link  to="/componentRelationships"> Component Relationships Page </Link> */}
          </div>  
      </div> 
    </div>
  )
};

export default HealthMetricsContainer;