import React from 'react';
import HealthMetricsChart from '../chartComponents/HealthMetricsChart';



const HealthMetricsContainer = () => {
    return(
        <div className="flex-auto"> 
          <h4>Health Dashboard </h4>
           <div>
            <HealthMetricsChart/>
           </div>
          

        </div>
    )
}

export default HealthMetricsContainer

          