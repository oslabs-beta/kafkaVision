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
            displayedBoxes.push(<Link to={urlsText[i]} key={i} className="bg-limeGreen rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:bg-slateBlue/50 hover:text-limeGreen border border-limeGreen hover:rounded-xl hover:border-limeGreen/50 transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </Link>)
        } else{

            //FIX THE HOVER BORDER FOR UNCLICKED BOXES -- NOT SURE WHY IT'S NOT WORKING.

            displayedBoxes.push(<Link to={urlsText[i]} key={i} className="bg-seafoam rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:text-seafoam/90  hover:bg-darkBlue/10 hover:border-seafoam hover:rounded-xl transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </Link>)
        }
    }
    console.log(tabSelected)
    return(
            <div className="bg-darkBlue/90 w-full flex flex-col shadow-lg" >{/*"fixed bg-blue-800 top-20 left-0 h-screen grow flex flex-col text-white shadow-lg">*/}
                {displayedBoxes}
                <Link to='/'>Sign Out</Link>            
            </div>       
    )

}

export default Sidebar;