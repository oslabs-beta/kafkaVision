import React, {useContext} from 'react';
import { appContext } from '../App';

const BrokerDiagram = () => {

    // const {globalState, setGlobalState} = useContext(globalStateContext);
    const dummyBrokerState = {
        "Topic #1": 
            {
                "Broker #1": ["T1 P1", "T1 P2"],
                "Broker #2": ["T1 P3"],
                "Broker #3": ["T1 P4"]  
            },
        "Topic #2":
            {
                "Broker #1": ["T1 P1", "T1 P2", "T1 P3"],
            },
        "Topic #3":
            {
                "Broker #1": ["T1 P1", "T1 P2"],
                "Broker #2": ["T1 P3", "T1 P4"],
                "Broker #3": ["T1 P5"],
                "Broker #4": ["T1 P6"],

            },
        "Topic #4":
            {
                "Broker #1": ["T1 P1", "T1 P2", "T1 P3", "T1 P4", "T1 P5"],
                "Broker #2": ["T1 P6"],
            },
        "Topic #5":
            {
                "Broker #1": ["T1 P1"],
                "Broker #2": ["T1 P2"],
                "Broker #3": ["T1 P3", "T1 P4"],
            },
    }
    

    return (
        // static diagram built for example purposes
        <div className="bg-orange-300 h-auto flex flex-row justify-around">
            <div className="bg-teal-200 h-60 w-96 m-10 rounded-lg text-center text-2xl font-bold flex flex-col justify-start">
                Broker #1
                <div>
                    <div className="bg-purple-300 font-normal m-5 w-auto h-auto"> T1 P1 </div>
                    <div className="bg-purple-300 font-normal m-5 w-auto h-auto"> T1 P2 </div>
                    <div className="bg-purple-300 font-normal m-5 w-auto h-auto"> T1 P3 </div>
                </div>
            </div>
            <div className="bg-teal-200 h-60 w-96 m-10 rounded-lg text-center text-2xl font-bold flex flex-col justify-start">
                Broker #2
                <div className="bg-purple-300 font-normal m-5 w-auto h-auto"> T1 P4 </div>
                <div className="bg-red-500 font-normal m-5 w-auto h-auto"> T2 P1 </div>


            </div>
            <div className="bg-teal-200 h-60 w-96 m-10 rounded-lg text-center text-2xl font-bold flex flex-col justify-start">
                Broker #3
                <div className=" bg-red-500 font-normal m-5 w-auto h-auto"> T2 P2 </div>
            </div>
        </div>
    )
};


export default BrokerDiagram;