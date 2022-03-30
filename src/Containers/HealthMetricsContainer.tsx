import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';
import HealthMetricsChart from '../chartComponents/HealthMetricsChart';
import StaticHealthData from '../Components/StaticHealthData'

const HealthMetricsContainer = () => {
  //UNPACK APP STATE
  const {
    state: { connectionState },
    actions: { setGlobalState },
  } = useContext(appContext);

  const connectionStatus = connectionState.isConnected; // semantic variable

  //TOPICS DROP DOWN MENU
  // const options = [];
  // for (let i = 1; i <= topics; i += 1) {
  //   options.push(
  //     <option value="topic{i}" key={i}>
  //       {' '}
  //       Topic {i}{' '}
  //     </option>
  //   );
  // }

  let renderedContent: any;
  if (connectionStatus === false) {
    renderedContent = (
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
    );
  } else if (connectionStatus && !connectionState.valid_prom_url){
    renderedContent = (
      <div className="flex-auto justify-center text-fontGray/75">
        <div className="m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect to using a {' '}
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 };
              })
            }
          >
            Prometheus Connection
          </Link>{' '}
          to see this page
        </div>
      </div>
    );
  }
  else if (connectionStatus && connectionState.valid_prom_url) {
    renderedContent = (
      <div className="text-xl text-center m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75 font-bold">
        <h2 className="m-4 text-center">Health Dashboard</h2>
        <div className="border-2 border-seafoam/40 rounded m-5 flex flex-col bg-slateBlue/50">
          {/* Overall Cluster Health */}
          <div className="rounded m-5 border border-fontGray/50 bg-zinc-800">
            <p className="m-3">Overall Cluster Health</p>
            <div className="flex justify-around">
              <HealthMetricsChart />
            </div>
          </div>
          <div>
            <StaticHealthData />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-auto justify-center">
      {renderedContent}
    </div>
  );
};

export default HealthMetricsContainer;
