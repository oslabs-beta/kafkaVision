import React from 'react';
import { Link } from 'react-router-dom';


const ConnectClusterPage = () => {
    return(
        <div className='flex justify-center text-fontGray/70 border rounded border-limeGreen/70 m-10'>
            <div className="font-bold text-xl m-4 text-fontGray-75"> 
                <h1>Connect Cluster Page! </h1>
            </div>

            <div className='border-2 border-seafoam/40 rounded m-5 bg-slateBlue/50'>
               <p>hello hi </p> 
            </div>
            <div>
                {/* <Link to="/"> Login Page </Link>
                <Link to="/health"> Health Metrics Page </Link>
                <Link to="/componentRelationships"> Component Relationships Page </Link> */}
            </div>
        </div>    )
}

export default ConnectClusterPage;