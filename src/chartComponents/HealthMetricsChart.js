import React from 'react';
import CPUGauge from './graphs/CPUGauge.js';
import CPUGraph from './graphs/CPUGraph.js';
import JVMGraph from './graphs/JVMGraph.js';
import GCGraph from './graphs/GCGraph.js';


const HealthMetricsChart = () => {
  return (
    <div> 
      {/* CPU USAGE GRAPHS */}
      <div className="w-full h-full grid grid-cols-2 px-2 py-1 ">
        <div className="col-span-1">
          <CPUGraph/>
        </div>
        <div className="bg-green-500 col-span-1">
          second column
          {/* <CPUGauge/> */}
        </div>
      </div>

      {/* JVM MEMORY GRAPHS */}
      <div className="w-full h-full grid grid-cols-2 px-2 py-1">
        <div className="col-span-1">
          <JVMGraph/>
        </div>
        <div className="bg-zinc-100 col-span-1">
          second column
          {/* <JVMGauge/> */}
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-2 px-2 py-1">
        <div className="col-span-1">
          <GCGraph/>
        </div>
        <div className="bg-green-500 col-span-1">
          second column
          {/* <JVMGauge/> */}
        </div>
      </div>

    </div>

    
  )

}

export default HealthMetricsChart;