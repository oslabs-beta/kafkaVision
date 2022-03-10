import React, {useState} from 'react';

const Sidebar = () => {

    const [tabSelected, setTabSelected] = useState(0);

    let displayedBoxes = [];
    for (let i = 0; i<3; i+=1){
        if (i===tabSelected){
            displayedBoxes.push(<div className="bg-boldLilac text-center p-20" onClick={() => setTabSelected(i)}> Button {i} </div>)
        } else{
            displayedBoxes.push(<div className="bg-slate text-center p-20" onClick={() => setTabSelected(i)}> Button {i} </div>)
        }
    }
    console.log(tabSelected)
    return(
        <div className="fixed bg-darkTeal top-0 left-0 h-screen w-16 flex flex-col text-white">
            {displayedBoxes}
        </div>
    )

}

export default Sidebar;