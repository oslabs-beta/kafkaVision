import React, {useState} from 'react';

const Sidebar = () => {

    const [tabSelected, setTabSelected] = useState(0);

    let displayedBoxes = [];
    const buttonText = ["Connect Cluster", "Health Metrics", "Component Diagrams"]
    for (let i = 0; i<3; i+=1){
        if (i===tabSelected){
            displayedBoxes.push(<div className="bg-teal-200 rounded-2xl text-center p-5 m-5 hover:bg-teal-300 hover:rounded-xl transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </div>)
        } else{
            displayedBoxes.push(<div className="bg-teal-200 rounded-2xl text-center p-5 m-5  hover:bg-teal-300 hover:rounded-xl transition-all duration-300" onClick={() => setTabSelected(i)}> {buttonText[i]} </div>)
        }
    }
    console.log(tabSelected)
    return(
        <div className="fixed bg-darkTeal top-20 left-0 h-screen w-40 flex flex-col text-white shadow-lg">
            {displayedBoxes}
        </div>
    )

}

export default Sidebar;