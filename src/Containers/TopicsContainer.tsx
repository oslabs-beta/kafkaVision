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
  //unpack state for query link & connection status (will determine whether normal or blocked page is rendered)
  const {
    state: { connectionState },
    actions: {setGlobalState}
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);
  const parentRef = useRef<HTMLDivElement>(null);
  const [fetchedTopicNames, setFetchedTopicNames] = useState(['','','','','']);

  // 'fetchReturned' used to delay render of child elements until the TOP 5 topic fetch is done
  const [fetchReturned, setFetchReturned] = useState(false);

  useEffect( () => {
    // fetch to get TOP 5 topic names on page load, based on BytesIn (criteria can be changed)
    const query = 'topk(10, sum(rate(kafka_server_brokertopicmetrics_bytesinpersec[5m])) by (topic))'
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        //clean incoming data containing topic names of 10 highest BytesIn statistics & save in global state
        let cleanedResults = result.data.result.filter((s: any) => Object.keys(s.metric).includes("topic")).slice(0, 5);
        cleanedResults = cleanedResults.map( (s:any) => s.metric.topic)
        setFetchedTopicNames([...cleanedResults])
        // child elements will render following 'setFetchReturned' below
        setFetchReturned(true);
        })  
      .catch((err) => {
          console.log('ERROR IN TOPICS CALL: ', err);
    });
  }
  , []);

  // used in for loop below to help render accordian menu sections
  const helperFunction = (i: number) => {
    setIsOpen((prevState) => {
      prevState[i] = !prevState[i];
      return {...prevState};
    })
  };
 
  // create sections of accordian menu
  const topics = [];
  for (let i = 0; i < 5; i++){
    // 'collapse' used to switch between each component's styling that will show it either as open (scale-100) or closed (scale-0)
    let collapse: string = isOpen[i] ? 'h-70 scale-100 m-3 p-3 border rounded border-seafoam/40 bg-slateBlue/50 transition-all duration-300' : 'h-0 scale-0 transition-all duration-300';
    topics.push(
      <div className='border border-fontGray/40 rounded m-3 p-3 bg-zinc-800' ref={parentRef} onClick={()=> helperFunction(i)}> 
        <div className="cursor-default font-bold text-2xl text-limeGreen/70 pl-7" key={i}>
          {fetchedTopicNames[i]}
        </div>
        <div className={collapse}>
          <div className='m-5 h-70'>
            <TopicsChart fetchedTopicName={fetchedTopicNames[i]} />
          </div>
        </div>
      </div>
    )
  };

  // 3 main div sections below - only one is displayed, based on connectionStatus and 'valid_prom_url'
  // first 2 are 'block' pages for bad connections, third is normal/expected content
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
        <div className='border-2 border-seafoam/40 rounded m-5 y-5 bg-slateBlue/50'>
          <h1 className='text-4xl text-seafoam/70 text-bold text-center m-5'>Top 5 Topics Throughput</h1>
          {fetchReturned && topics}
        </div>
      )}
    </div>
  )
};

export default TopicsContainer;