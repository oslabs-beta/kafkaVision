import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';

const Sidebar = () => {

    //UNPACKING STATE:
    const appState = useContext(appContext);
    // const globalState: any = appState.global[0];
    // const setGlobalState: any = appState.global[1]
    const [globalState, setGlobalState] = appState.global;
    // const [tabSelected, setTabSelected] = useState(0);
    console.log("redendered")
    console.log(globalState.sidebarTab)
    console.log(setGlobalState)
    let displayedBoxes = [];

    // refactor this for loop?
    const buttonText = ["Connect Cluster", "Health Metrics", "Partition Diagrams"]
    const urlsText = ['/connectCluster', '/health', '/componentRelationships']
    for (let i = 0; i<3; i+=1){
        // put in cool shadows?
        // sizes auto-adjust if the text takes up two lines
        if (i===globalState.sidebarTab){
            displayedBoxes.push(<Link to={urlsText[i]} key={i} 
                className="bg-limeGreen/80 rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:bg-slateBlue/50 hover:text-limeGreen border border-limeGreen hover:rounded-xl hover:border-limeGreen/50 transition-all duration-300" 
                onClick={() => setGlobalState((prevState:any) => {return {...prevState, sidebarTab:i}})}> {buttonText[i]} </Link>)
        } else{
            displayedBoxes.push(<Link to={urlsText[i]} key={i} 
                className="bg-seafoam/80 rounded-2xl text-center text-slateBlue px-10 py-5 m-5 hover:text-seafoam/90  hover:bg-darkBlue/10 border border-seafoam/90 hover:border-seafoam/90 hover:rounded-xl transition-all duration-300" 
                onClick={() => setGlobalState((prevState:any) => {return {...prevState, sidebarTab:i}})}> {buttonText[i]} </Link>)
        }
    }

    return(
            <div className="bg-darkIndigo/70 w-full flex flex-col shadow-lg" >{/*"fixed bg-blue-800 top-20 left-0 h-screen grow flex flex-col text-white shadow-lg">*/}
                {displayedBoxes}
                {/* <Link to='/'>Sign Out</Link>             */}
            </div>       
    )
}
export default Sidebar;