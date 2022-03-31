import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';

const Sidebar = () => {
  //unpack state to color sidebar buttons correctly
  const {
    state: { globalState },
    actions: { setGlobalState },
  } = useContext(appContext);

  // for loop to create sidebar buttons; text arrays that will be inserted into elements shown prior
  // global state variable 'sidebarTab' below used to save  index of current button
  let displayedBoxes = [];
  const buttonText = ['Connect Cluster', 'Health Metrics', 'Partition Diagrams', 'Topic Metrics'];
  const urlsText = ['/connectCluster', '/health', '/componentRelationships', '/topicMetrics'];
  const roles = ['cluster_button', 'health_button', 'component_button', 'topic_button']
  for (let i = 0; i < 4; i += 1) {
    // creates element of unique color if it's for the page user is currently on
    if (i === globalState.sidebarTab) {
      displayedBoxes.push(
        <Link
          to={urlsText[i]}
          role={roles[i]}
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
      // otherwise, creates elements of normal color if they're not the page user is currently on 
      displayedBoxes.push(
        <Link
          to={urlsText[i]}
          role={roles[i]}
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
