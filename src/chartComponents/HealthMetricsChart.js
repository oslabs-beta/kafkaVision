import React, { useContext } from 'react';
import CPUGauge from './graphs/CPUGauge.js';
import CPUGraph from './graphs/CPUGraph.js';
import JVMGraph from './graphs/JVMGraph.js';
import GCGraph from './graphs/GCGraph.js';
import BrokerThroughputGraph from './graphs/BrokerThroughput.js';
import FetchLatencyGraph from './graphs/FetchLatencyGraph.js';
import { appContext } from '../App.tsx';

const HealthMetricsChart = () => {
  //UNPACK CONNECTION STATE (TO GET whether cluster is Connected)
  const {
    state: { connectionState },
  } = useContext(appContext);
  const connectionStatus = connectionState.isConnected;

  return (
    <div>
      {!connectionStatus && (
        <div className="flex-auto justify-center">
          <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-slate-800">
            Please Connect to see this page
          </div>
        </div>
      )}
      {connectionStatus && (
        <div>
          <div className="w-fit h-fit grid grid-cols-2 gap-10 ">
            {/* CPU USAGE GRAPHS */}
            <div className="cols-span-1 bg-gray-800 border border-fontGray/40 rounded">
              <CPUGraph />
            </div>
            <div className="cols-span-1 bg-gray-800 border border-fontGray/40 rounded">
              CPU Usage Gauge
              <CPUGauge />
            </div>
            {/* <div className="col-span-1 bg-gray-800 border border-fontGray/40 rounded">
              <FetchLatencyGraph/>
            </div> */}
            {/* JVM MEMORY GRAPHS */}
            <div className="col-span-1 bg-gray-800 border border-fontGray/40 rounded">
              <JVMGraph />
            </div>
            <div className="col-span-1 bg-gray-800 border border-fontGray/40 rounded">
              <GCGraph />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsChart;
