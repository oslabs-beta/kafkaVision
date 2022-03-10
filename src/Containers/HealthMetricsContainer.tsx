import React from 'react';
import { Link } from 'react-router-dom';

const HealthMetricsContainer = () => {
    return(
        <div>
            <div> Health Metrics Area! </div>
            <div>
                <Link to="/connectCluster"> Connect Cluster Page </Link>
                <Link to="/"> Login Page </Link>
                <Link to="/componentRelationships"> Component Relationships Page </Link>
            </div>
        </div>
    )
}

export default HealthMetricsContainer