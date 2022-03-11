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
        <div>
            <div className="font-bold text-xl m-2"> Relationships Diagrams Area!  </div>
            <div className="w-full bg-red-200">
            <select className="m-5" name="topic" id="topic">
                {/* <option value="topic1"> Topic 1 </option>
                <option value="topic2"> Topic 2 </option>
                <option value="topic3"> Topic 3 </option> */}
                {options}
            </select>
            </div>

            <div>
                {/* <Link to="/connectCluster"> Connect Cluster Page </Link>
                <Link to="/health"> Health Metrics Page </Link>
                <Link to="/"> Login Page </Link> */}
            </div>
        </div>
    )
}

export default RelationshipsContainer