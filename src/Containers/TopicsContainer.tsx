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
  const [isOpen, setIsOpen] = useState([false, false, false, false, false]);
  const parentRef = useRef<HTMLDivElement>(null);


  const helperFunction = (i: number) => {
    setIsOpen((prevState) => {
      prevState[i] = !prevState[i];
      return {...prevState};
    })
  };
 
  const topics = [];
  for (let i = 0; i < 5; i++){
    let collapse: string = isOpen[i] ? 'h-70 scale-100 border border-green-300 transition-all duration-300' : 'h-0 scale-0 transition-all duration-300';
 

    topics.push(
      <div className='border border-red-900 m-0 p-0' ref={parentRef} onClick={()=> helperFunction(i)}> 
        <div className="cursor-default m-0 p-0" key={i}>
          Topic: {i+1}
        </div>
        {/* <button 
          key={i}
          onClick={() => {
            console.log(i, 'clicked');
            helperFunction(i);
          }}> */}
              
        {/* </button> */}
        <div className={collapse}>
          <div className='border border-white m-5 h-70'>
            <TopicsChart/>
          </div>
        </div>
      </div>
    )
  };

  

  return (
    <div>
      {topics}
    </div>
  )
};


export default TopicsContainer;