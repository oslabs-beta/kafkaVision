import React from 'react';
import CPUGauge from './graphs/CPUGauge.js';
import CPUGraph from './graphs/CPUGraph.js';


const HealthMetricsChart = () => {
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="col-span-1">
        <CPUGraph/>
      </div>
      <div className="bg-green-500 col-span-1">
        second column
        {/* <CPUGauge/> */}
      </div>
    </div>
  )

}

export default HealthMetricsChart;