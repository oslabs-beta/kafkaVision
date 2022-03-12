import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HealthMetricsChart from '../chartComponents/HealthMetricsChart';

const HealthMetricsContainer = () => {
  // dummy state:
  const [topics, setTopics] = useState([1, 2, 3, 4, 5]);

  const options = [];
  for (let i = 1; i <= topics.length; i +=1){
      options.push(<option value="topic{i}"> Topic {i} </option>)
  }

  //logic for producing metrics for list


  return(
    <div className='flex-auto justify-center'>
      <div className="font-bold text-xl text-center height-max m-10 border-2 border-white rounded bg-backgroundC-400"> 
        <h2 className="m-4 text-center">Health Dashboard</h2>

          <div>
              {/* <Link to="/connectCluster"> Connect Cluster Page </Link>
              <Link className="bg-white" to="/"> Login Page </Link>
              <Link  to="/componentRelationships"> Component Relationships Page </Link> */}
          </div>

          <div className="border-2 border-white rounded m-5 grid grid-cols-2  bg-backgroundC-300">

            {/* Overall Cluster Health */}
            <div className='border border-white rounded m-5 bg-backgroundC-200/50'>
              <p className='m-3'>Overall Cluster Health</p>
              <div className='flex items-center justify-center m-8'>
                <HealthMetricsChart/>
              </div>
            </div>

            {/* Topic Metrics */}
            <div className='border border-white rounded m-5 bg-backgroundC-200/50'>
              <p className='m-3'>Topic Metrics</p>
              
              {/* Drop Down Menu */}
              <div className='text-sm text-left mx-5'>
                <p>Please Select a Topic:</p>
                <select className='my-1' name="topic" id="topic">
                  {/* <option value="topic1"> Topic 1 </option>
                  <option value="topic2"> Topic 2 </option>
                  <option value="topic3"> Topic 3 </option> */}
                  {options}
                </select>

                {/* List of metrics */}
                <ul className='bg-buttonC-300 rounded my-2 p-4 text-sm font-light divide-y-2'>
                  {/* text placeholders */}
                  <li>Isabelle :P</li>
                  <li>Kayliegh :3</li>
                  <li>Rob 8D </li>
                  <li>Neel :D</li>
                </ul>
              </div> 
            </div>

          </div>


      </div> 
    </div>
  )
};

export default HealthMetricsContainer