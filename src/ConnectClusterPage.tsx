import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { appContext } from './App.js';


const ConnectClusterPage = () => {
    // const appState = useContext(appContext);
    // const [connectionState, setConnectionState] = appState.connection;

    const [url_kafka, setKafka] = useState('');
    const [url_prometheus, setProm] = useState('');
  
    const handleKafkaInput = (event:any) => {
      setKafka(event.target.value);
    };
  
    const handlePromInput = (event:any) => {
      setProm(event.target.value);
    };

    function saveProm(url_prometheus: String) {
        fetch('/api/user/saveprom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url_prometheus,
            // need to add user_id (from state)
            }),
          })
        .then((res) => res.json())
        .then(
            (data) => {
            // setConnected to Prom to TRUE
            //setConnectionState({url_prometheus = url_prometheus})
            },
            (error) => {
            console.log(error);
            }
        );
    }

    function saveKafka(url_kafka: String) {
        fetch('/api/user/savekafka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url_kafka,
            // need to add user_id (from state)
            }),
          })
        .then((res) => res.json())
        .then(
            (data) => {
            // setConnected to Kafka to TRUE
            //setConnectionState({url_kafka = url_kafka})
            },
            (error) => {
            console.log(error);
            }
        );
    }


    return(
        <div className='flex justify-center text-fontGray/70 border rounded border-limeGreen/70 m-10'>
            <div className="font-bold text-xl m-4 text-fontGray-75"> 
                <h1>Connect Kafka Cluster</h1>
            </div>
            <div className="h-screen relative flex items-center justify-center">
                <div className="flex">
                    <label htmlFor="urlKafka">Enter broker port: </label>            
                    <input onChange={handleKafkaInput} placeholder="Kafka Broker Port" name="urlKafka" id="urlKafka" value={url_kafka} className="m-5" type="text"></input>
                    <button className="bg-slate-300 m-2 rounded" onClick={()=>{saveKafka(url_kafka); setKafka('')}}>Submit</button>
                </div>
                <div className='flex'>
                    <label htmlFor="urlKafka">Enter broker port: </label>            
                    <input onChange={handlePromInput} className="m-5" placeholder="Prometheus Port" name="urlProm" type-="text" value={url_prometheus}></input>
                    <button className="bg-slate-300 m-2 rounded" onClick={()=>{saveProm(url_prometheus); setProm('')}}>Submit</button>
                </div>       
            </div>
            <div>
                {/* <Link to="/"> Login Page </Link>
                <Link to="/health"> Health Metrics Page </Link>
                <Link to="/componentRelationships"> Component Relationships Page </Link> */}
            </div>
        </div>    )
}

export default ConnectClusterPage;