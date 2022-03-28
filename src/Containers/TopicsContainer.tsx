import React, { useEffect, useState, useRef } from 'react';
import TopicsChart from '../chartComponents/TopicsChart';


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

  const collapse: any = isOpen ? 'h-70 scale-100 border border-green-300' : 'h-0 scale-0';

  const topics = [];
  for (let i = 0; i < 5; i++){
    topics.push(
      //added parentRef => supposed to be able to open one at a time?
      <div className='border border-red-900' ref={parentRef}> 
      <button onClick={() => {
        console.log('clicked');
        console.log('height, ', collapse);
        setIsOpen(!isOpen)}}>
        Topic: {i}
      </button>
      <div className={collapse}>
        <div className='border border-white m-5 h-70'>
          <TopicsChart/>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div>
      {topics}
    </div>
  )
};


export default TopicsContainer;