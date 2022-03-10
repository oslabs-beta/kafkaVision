import React from 'react';
import { Link } from 'react-router-dom';


const ConnectClusterPage = () => {
    return(
        <div>
            <div> Connect Cluster Page! </div>
            <div>
                <Link to="/"> Login Page </Link>
                <Link to="/health"> Health Metrics Page </Link>
                <Link to="/componentRelationships"> Component Relationships Page </Link>
            </div>
        </div>    )
}

export default ConnectClusterPage;