import React from 'react';
import { Link } from 'react-router-dom';
// import HealthMetricsChart from '../chartComponents/HealthMetricsChart';

const HealthMetricsContainer = () => {
    return(
        <div>
            <div> Health Metrics Area! </div>
            <div>
                <Link to="/connectCluster"> Connect Cluster Page </Link>
                <Link className="bg-white" to="/"> Login Page </Link>
                <Link  to="/componentRelationships"> Component Relationships Page </Link>
            </div>
            {/* <HealthMetricsChart/> */}
        </div>
    )
}

export default HealthMetricsContainer