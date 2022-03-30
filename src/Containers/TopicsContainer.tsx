import React, { useEffect, useState, useRef, useContext } from 'react';
import TopicsChart from '../chartComponents/TopicsChart';
import { appContext } from '../App';
import {Link} from 'react-router-dom'

interface Props {
  key: number,
  // value: number, 
  onClick: () => boolean,
  parentRef: {},
  style: string,
  collapse: {
    height: string
  }
};  

const TopicsContainer = () => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
    actions: {setGlobalState}
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;
  console.log("PROM URL", connectionState.valid_prom_url)
  //LOCAL STATE
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);
  // const [bytesInName, setBytesInName] = useState(['', '', '', '', '']);
  // const [bytesIn, setBytesIn] = useState([5, 5, 5, 5, 5]);
  // const [bytesOutName, setBytesOutName] = useState(['', '', '', '', '']);
  // const [bytesOut, setBytesOut] = useState([20, 20, 20, 20, 20]);
  // const [messagesname, setMessagesName] = useState(['', '', '', '', '']);
  // const [messages, setMessages] = useState([30, 30, 30, 30, 30]);
  const parentRef = useRef<HTMLDivElement>(null);

  const [fetchedTopicNames, setFetchedTopicNames] = useState(['','','','','']);
  const [fetchReturned, setFetchReturned] = useState(false);

  useEffect( () => {
    // fetch to get new topic names...
    const query = 'topk(10, sum(rate(kafka_server_brokertopicmetrics_bytesinpersec[5m])) by (topic))'
    console.log("query link", queryLink+query)
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        //CLEAN INCOMING QUERY DATA:
        let cleanedResults = result.data.result.filter((s: any) => Object.keys(s.metric).includes("topic")).slice(0, 5);
        cleanedResults = cleanedResults.map( (s:any) => s.metric.topic)
        setFetchedTopicNames([...cleanedResults])
        setFetchReturned(true);
        })  
      .catch((err) => {
          console.log('ERROR IN TOPICS CALL: ', err);
    });
  }
  , []);

  const helperFunction = (i: number) => {
    setIsOpen((prevState) => {
      prevState[i] = !prevState[i];
      return {...prevState};
    })
  };
 
  const topics = [];
  for (let i = 0; i < 5; i++){
    let collapse: string = isOpen[i] ? 'h-70 scale-100 m-3 p-3 border rounded border-seafoam/40 bg-slateBlue/50 transition-all duration-300' : 'h-0 scale-0 transition-all duration-300';

    topics.push(
      <div className='border border-limeGreen/70 rounded m-3 p-3' ref={parentRef} onClick={()=> helperFunction(i)}> 
        <div className="cursor-default m-0 p-0 text-fontGray/40" key={i}>
          {fetchedTopicNames[i]}
        </div>
        {/* <button 
          key={i}
          onClick={() => {
            console.log(i, 'clicked');
            helperFunction(i);
          }}> */}
              
        {/* </button> */}
        <div className={collapse}>
          <div className='m-5 h-70'>
            <TopicsChart fetchedTopicName={fetchedTopicNames[i]} />
          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      {!connectionState.isConnected && (
        <div className="flex-auto justify-center text-fontGray/75">
        <div className="m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect to your{' '}
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 };
              })
            }
          >
            Cluster
          </Link>{' '}
          to see this page
        </div>
      </div>
      )}
      {(connectionState.isConnected && !connectionState.valid_prom_url) && (
        <div className="flex-auto justify-center text-fontGray/75">
        <div className="m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect using a {' '}
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 }; 
              })
            }
          >
            PromQL Connection
          </Link>{' '}
          to see this page
        </div>
      </div>
      )}
      {(connectionState.isConnected && connectionState.valid_prom_url) && (
        <div className='border-2 border-seafoam/40 rounded m-5 y-5'>
          <h1 className='text-3xl text-seafoam/70 text-center m-5'>Top 5 Topics Throughput</h1>
          {fetchReturned && topics}
        </div>
      )}
    </div>
  )
};

export default TopicsContainer;