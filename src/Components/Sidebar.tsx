import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';

const Sidebar = () => {
  //UNPACKING STATE:
  const {
    state: { globalState },
    actions: { setGlobalState },
  } = useContext(appContext);
  let displayedBoxes = [];

  // refactor this for loop?
  const buttonText = [
    'Connect Cluster',
    'Health Metrics',
    'Partition Diagrams',
    'Topic Metrics'
  ];
  const urlsText = ['/connectCluster', '/health', '/componentRelationships', '/topicMetrics'];
  for (let i = 0; i < 4; i += 1) {
    // put in cool shadows?
    // sizes auto-adjust if the text takes up two lines
    if (i === globalState.sidebarTab) {
      displayedBoxes.push(
        <Link
          to={urlsText[i]}
          key={i}
          className="bg-limeGreen/80 rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:bg-slateBlue/50 hover:text-limeGreen border border-limeGreen hover:rounded-xl hover:border-limeGreen/50 transition-all duration-300"
          onClick={() =>
            setGlobalState((prevState: any) => {
              return { ...prevState, sidebarTab: i };
            })
          }
        >
          {buttonText[i]}
        </Link>
      );
    } else {
      displayedBoxes.push(
        <Link
          to={urlsText[i]}
          key={i}
          className="bg-seafoam/80 rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:text-seafoam/90  hover:bg-darkBlue/10 border border-seafoam/90 hover:border-seafoam/90 hover:rounded-xl transition-all duration-300"
          onClick={() =>
            setGlobalState((prevState: any) => {
              return { ...prevState, sidebarTab: i };
            })
          }
        >
          {buttonText[i]}
        </Link>
      );
    }
  }

  return (
    <div className="bg-darkIndigo/70 w-full flex flex-col shadow-lg">
      {displayedBoxes}
    </div>
  );
};
export default Sidebar;
