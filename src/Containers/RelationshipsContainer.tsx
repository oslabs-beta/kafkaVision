import React from 'react';
import { Link } from 'react-router-dom';


const RelationshipsContainer = () => {
    return(
        <div>
            <div> Relationships Diagrams Area!  </div>
            <div>
                <Link to="/connectCluster"> Connect Cluster Page </Link>
                <Link to="/health"> Health Metrics Page </Link>
                <Link to="/"> Login Page </Link>
            </div>
        </div>
    )
}

export default RelationshipsContainer