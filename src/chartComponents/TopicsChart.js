import React, {useContext} from 'react';
import {appContext} from '../App.tsx';
import BytesInGraph from './graphs/BytesInGraph.js';
import BytesOutGraph from './graphs/BytesOutGraph.js';
import MessagesInGraph from './graphs/MessagesInGraph.js';

const TopicsChart = (props) => {
  
  return (
    <div className='flex flex-row justify-around h-full items-center'>
      <div className="h-full w-full bg-gray-800 border border-fontGray/40 text-fontGray/75 font-bold rounded">
        <BytesInGraph fetchedTopicName={props.fetchedTopicName}/>
      </div>

      <div className="h-full w-full bg-gray-800 border border-fontGray/40 fontGray/40 rounded gap-10 ">
        <BytesOutGraph fetchedTopicName={props.fetchedTopicName}/>
      </div>

      <div className="h-full w-full bg-gray-800 border border-fontGray/40 rounded gap-10 ">
        <MessagesInGraph fetchedTopicName={props.fetchedTopicName}/>
      </div>

    </div>
  )
};
export default TopicsChart;
