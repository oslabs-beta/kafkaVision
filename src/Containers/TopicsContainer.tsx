import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';
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

  return (
    <div className='border border-red-900'>
      <button onClick={() => {
        console.log('clicked');
        console.log('height, ', collapse);
        setIsOpen(!isOpen)}}>
        topic1
      </button>
      <div className={collapse}>
        <div className='border border-white m-5 h-70'>
          <TopicsChart/>
        </div>
      </div>
    </div>
  )
 
  // const topics = [];
  // for (let i = 0; i < 5; i++){
  //   topics.push(
  //     <div>
  //       <button key={i} 
  //         onClick={() => {
  //           console.log(i, 'CLICKED!');
  //           console.log('COLLAPSE: ', collapse);
  //           setIsOpen(!isOpen)}}> 
  //         Topic {i} 
  //       </button>
  //       <div className={collapse}>
          
  //       </div>
  //     </div>
  //   )
  // }

  // return (
  //   <div ref={parentRef} >
  

  //     {topics}
  //     {/* <div style={collapse} className='border border-white'> 
  //     Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
  //     </div> */}
         
  //   </div>
  // )
};


export default TopicsContainer;