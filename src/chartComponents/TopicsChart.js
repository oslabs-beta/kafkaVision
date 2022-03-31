import React, {useContext} from 'react';
import {appContext} from '../App.tsx';
import BytesInGraph from './graphs/BytesInGraph.js';
import BytesOutGraph from './graphs/BytesOutGraph.js';
import MessagesInGraph from './graphs/MessagesInGraph.js';

// interemediate container between 'TopicsContainer' and 3 graphs within each accordian section
const TopicsChart = (props) => {  
  return (
    <div className='flex flex-row justify-around h-full items-center'>
      <div className="h-full w-full bg-gray-800 border border-fontGray/40 text-fontGray/75 font-bold rounded">
        <BytesInGraph bytesIn={props.bytesIn}/>
      </div>

      <div className="h-full w-full bg-gray-800 border border-fontGray/40 fontGray/40 rounded gap-10 ">
        <BytesOutGraph/>
      </div>

      <div className="h-full w-full bg-gray-800 border border-fontGray/40 rounded gap-10 ">
        <MessagesInGraph/>
      </div>

    </div>
  )
};
export default TopicsChart;
