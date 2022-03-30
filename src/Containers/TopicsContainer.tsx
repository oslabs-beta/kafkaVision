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
  const [bytesInName, setBytesInName] = useState(['', '', '', '', '']);
  const [bytesIn, setBytesIn] = useState([5, 5, 5, 5, 5]);
  const [bytesOutName, setBytesOutName] = useState(['', '', '', '', '']);
  const [bytesOut, setBytesOut] = useState([20, 20, 20, 20, 20]);
  const [messagesname, setMessagesName] = useState(['', '', '', '', '']);
  const [messages, setMessages] = useState([30, 30, 30, 30, 30]);
  const parentRef = useRef<HTMLDivElement>(null);

  const [fetchData, setFetchData] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  const [fetchedTopicNames, setFetchedTopicNames] = useState(['','','','','']);



  //BYTES IN    
  useEffect(() => {
    const query = 'topk(10, sum(rate(kafka_server_brokertopicmetrics_totalfetchrequestspersec[5m])) by (topic))';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
          console.log('VALUES: ', result.series[0].fields[3].value);
          const metrics: number = result.series[0].fields[3].value;
          const topNames: number = result.series[0].fields[2].value;
          
          // //GET TOP 5 TOPICS
          // const topMetrics = metrics.sort().slice(-5);
          // console.log(topMetrics);

          // setBytesInName(topNames);
          // setBytesIn(topMetrics);

        })  
      .catch((err) => {
          console.log('ERROR IN BYTES IN TOPICS CONTAINER USEEFFECT: ', err);
    });
  }, [bytesInName, bytesIn]);


  const helperFunction = (i: number) => {
    setIsOpen((prevState) => {
      prevState[i] = !prevState[i];
      return {...prevState};
    })
  };
 
  const topics = [];
  for (let i = 0; i < bytesInName.length; i++){
    let collapse: string = isOpen[i] ? 'h-70 scale-100 m-3 p-3 border rounded border-seafoam/40 bg-slateBlue/50 transition-all duration-300' : 'h-0 scale-0 transition-all duration-300';

    topics.push(
      <div className='border border-fontGray/40 rounded m-3 p-3 bg-zinc-800' ref={parentRef} onClick={()=> helperFunction(i)}> 
        <div className="cursor-default font-bold text-2xl text-limeGreen/70 pl-7" key={i}>
          Topic: {topics[i]}
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
            <TopicsChart bytesIn={bytesIn} bytesOut={bytesOut} messages={messages} />
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
            Prometheus Connection
          </Link>{' '}
          to see this page
        </div>
      </div>
      )}
      {(connectionState.isConnected && connectionState.valid_prom_url) && (
        <div className='border-2 border-seafoam/40 rounded m-5 y-5 bg-slateBlue/50'>
          <h1 className='text-4xl text-fontGray/70 font-bold text-center m-5'>Top 5 Topics Throughput</h1>
          {topics}
        </div>
      )}
    </div>
  )
};

export default TopicsContainer;