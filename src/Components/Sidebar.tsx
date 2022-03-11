import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [tabSelected, setTabSelected] = useState(0);

    let displayedBoxes = [];

    // refactor this for loop?
    const buttonText = ["Connect Cluster", "Health Metrics", "Component Diagrams"]
    const urlsText = ['/connectCluster', '/health', '/componentRelationships']
    for (let i = 0; i<3; i+=1){
        // put in cool shadows?
        // sizes auto-adjust if the text takes up two lines
        if (i===tabSelected){
            displayedBoxes.push(<Link to={urlsText[i]} className="bg-teal-500 rounded-2xl text-center px-10 py-5 m-5 hover:bg-teal-300 hover:rounded-xl transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </Link>)
        } else{
            displayedBoxes.push(<Link to={urlsText[i]} className="bg-teal-200 rounded-2xl text-center px-10 py-5 m-5  hover:bg-teal-300 hover:rounded-xl transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </Link>)
        }
    }
    console.log(tabSelected)
    return(
            <div className="bg-backgroundC-100 w-full flex flex-col shadow-lg" >{/*"fixed bg-blue-800 top-20 left-0 h-screen grow flex flex-col text-white shadow-lg">*/}
                {displayedBoxes}
                <Link to='/'>Sign Out</Link>            
            </div>       
    )

}

export default Sidebar;