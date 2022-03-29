import React, { useEffect, useState, useRef, useContext } from 'react';
import TopicsChart from '../chartComponents/TopicsChart';
import { appContext } from '../App';

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
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;
  
  //LOCAL STATE
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);
  const [bytesInName, setBytesInName] = useState(['', '', '', '', '']);
  const [bytesIn, setBytesIn] = useState([0, 0, 0, 0, 0]);
  const [bytesOutName, setBytesOutName] = useState(['', '', '', '', '']);
  const [bytesOut, setBytesOut] = useState([0, 0, 0, 0, 0]);
  const [messagesname, setMessagesName] = useState(['', '', '', '', '']);
  const [messages, setMessages] = useState([0, 0, 0, 0, 0]);
  const parentRef = useRef<HTMLDivElement>(null);

  //use effect
    //do fetch
      //grab top 5 metrics and names

  //BYTES IN    
  useEffect(() => {
    const query = 'topk(10, sum(rate(kafka_server_brokertopicmetrics_totalfetchrequestspersec[5m])) by (topic))';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
          console.log('VALUES: ', result.series[0].fields[3].value);
          const metrics: any = result.series[0].fields[3].value;
          const topNames: any = result.series[0].fields[2].value;
          
          //GET TOP 5 TOPICS
          const topMetrics = metrics.sort().slice(-5);
          console.log(topMetrics);

          setBytesInName(topNames);
          setBytesIn(topMetrics);
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
      <div className='border border-limeGreen/70 rounded m-3 p-3' ref={parentRef} onClick={()=> helperFunction(i)}> 
        <div className="cursor-default m-0 p-0 text-fontGray/40" key={i}>
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
            <TopicsChart/>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className='border-2 border-seafoam/40 rounded m-5 y-5'>
      <h1 className='text-3xl text-seafoam/70 text-center m-5'>Top 5 Topics Throughput</h1>
      {topics}
    </div>
  )
};


export default TopicsContainer;