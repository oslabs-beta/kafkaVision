import React, { useContext } from 'react';
import CPUGauge from './graphs/CPUGauge.js';
import CPUGraph from './graphs/CPUGraph.js';
import JVMGraph from './graphs/JVMGraph.js';
import GCGraph from './graphs/GCGraph.js';
import { appContext } from '../App.tsx';

// intermediate section between 'HealthMetricsContainer' and child graphs
const HealthMetricsChart = () => {
  const {
    state: { connectionState },
  } = useContext(appContext);
  const connectionStatus = connectionState.isConnected;

  return (
    <div>
      {!connectionStatus && (
        <div>
          <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-slate-800">
            Please Connect to see this page
          </div>
        </div>
      )}
      {connectionStatus && (
        <div className="flex justify-around">
          <div className="w-fit h-fit grid grid-cols-2 gap-x-40 gap-y-20 ">

            <div className="cols-span-1 bg-gray-800 border mb-5 border-fontGray/40 rounded">
              <CPUGraph />
            </div>

            <div className="cols-span-1 bg-gray-800 border mb-5 border-fontGray/40 rounded">
              <CPUGauge />
            </div>

            <div className="col-span-1 bg-gray-800 border mb-5 border-fontGray/40 rounded">
              <JVMGraph />
            </div>

            <div className="col-span-1 bg-gray-800 border  mb-5 border-fontGray/40 rounded">
              <GCGraph />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsChart;
