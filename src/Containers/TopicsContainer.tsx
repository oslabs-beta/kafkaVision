import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';
import CPUGraph from '../chartComponents/graphs/CPUGauge.js'

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

//changed to any bc when Props are passed in error: TS2739: Type '{}' is missing the following properties from type 'Props': key, onClick, parentRef, style
const TopicsContainer: React.FC <any>= () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const collapse: any = isOpen ? {height: '300px'} : {height: '0px'};
 
  
  const topics = [];
  for (let i = 0; i < 5; i++){
    topics.push(
      <div className='py-3'>
        <button key={i} 
          onClick={() => {
            console.log(i, 'CLICKED!');
            console.log('COLLAPSE: ', collapse);
            setIsOpen(!isOpen)}}> 
          Topic {i} </button>
      </div>)
  }

  return (
    <div ref={parentRef} >
      {topics[0]}
      <div style={collapse} className='border border-white'> 
        <CPUGraph/>
      </div>
      

      {topics[1]}
      <div>
        Hello Word
      </div> 
      
      {topics[2]}
      <div>
        Hello Word
      </div> 
      
      {topics[3]}
      <div>
        Hello Word
      </div> 
      
      {topics[4]}
      <div>
        Hello Word
      </div>   
    </div>
  )
};


export default TopicsContainer;