import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const RelationshipsContainer = () => {

  // dummy state:
  const [topics, setTopics] = useState([1, 2, 3, 4, 5]);

  const options = [];
  for (let i = 1; i <= topics.length; i +=1){
      options.push(<option value="topic{i}"> Topic {i} </option>)
  }

  return(
    <div className='flex-auto justify-center'>
      <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75"> 
        <h1 className="font-bold text-xl m-4 text-center">Cluster Relations</h1>  

        <div className="border-2 border-seafoam/40 rounded m-5 bg-slateBlue/50">
          <p className='m-3'>Please Select a Topic:</p>

          {/* Drop Down Menu */}
          <select className="text-sm text-left mx-5 border border-limeGreen/50 rounded bg-zinc-900" name="topic" id="topic">
              {/* <option value="topic1"> Topic 1 </option>
              <option value="topic2"> Topic 2 </option>
              <option value="topic3"> Topic 3 </option> */}
              {options}
          </select>

          <div className='border border-slateBlue rounded m-3 bg-zinc-800'>
            <p>cluster graph</p>
          </div>
        </div>

        <div>
            {/* <Link to="/connectCluster"> Connect Cluster Page </Link>
            <Link to="/health"> Health Metrics Page </Link>
            <Link to="/"> Login Page </Link> */}
        </div>
      </div>
    </div>
  )
}

export default RelationshipsContainer