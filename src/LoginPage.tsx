import React from 'react';
import { Link } from 'react-router-dom';


const LoginPage = () => {
    return(
        <div className="bg-pink-600 h-screen">
            <div> Login Page! </div>
            <div className="text-white">
                <Link to="/connectCluster"> Connect Cluster Page...   </Link>
                <Link to="/health"> Health Metrics Page...   </Link>
                <Link to="/componentRelationships"> Component Relationships Page...   </Link>
            </div>

            <div className="bg-red-500 h-screen relative flex items-center justify-center">
                <form className="relative flex flex-col items-center justify-center bg-blue-800 h-250 w-250 shadow rounded" id="login box">
                    <input className="m-5" type="text" placeholder="username" name="user"></input>
                    <input className="m-5" type="text" placeholder="password" name="password"></input>
                    <button className="bg-orange-200" type="submit"> Sign In </button>
                </form>
                {/* <<div className="flex bg-orange-500 w-50 h-50">
                    <div className="bg-blue-400 w-20 h-20"> Username </div>
                    <div className="bg-orange-400 w-20 h-20"> Password </div>
                </div>> */}
            </div>

        </div>
    )

}

export default LoginPage;