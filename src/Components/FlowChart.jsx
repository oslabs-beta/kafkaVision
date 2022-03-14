import React from 'react';
import ReactFlow, { SmoothStepEdge } from 'react-flow-renderer';

const dummyData = {
    producers: ["Producer 1", "Producer 2", "Producer 3", "Producer 4"],
    Topic: 'Topic 1... let\'s go!',
    consumers: ["Consumer 1", "Consumer 2" ],
    connector: ["Connecter X"]
}

const height_adjustable = 600;
const width_adjustable = 900;



const FlowChart = () => {    
    const topic_id=dummyData.producers.length+1;
    // ^ superfluous variable but helps semantically w/ code below

    const producers = [];
    const connectingSegments = [];
    for (let i = 1; i<=dummyData.producers.length; i+=1){
        producers.push( {id:`${i}`, data: { label: dummyData.producers[i-1]}, type:'input', sourcePosition:'right', draggable:false, position: { x:0.2*width_adjustable, y:i*(height_adjustable/(dummyData.producers.length+1))}});
        // ^ need to rewrite math for x, y placements
        connectingSegments.push({ id:`e${i}-${topic_id}`, source:`${i}`, target:`${topic_id}`, animated:true, arrowHeadType:'arrowclosed', type:'smoothstep'})
    }

    const topic = { id: `${topic_id}`, data: { label: dummyData.Topic }, targetPosition:'left', sourcePosition:'right', position: { x: width_adjustable/2, y: height_adjustable/2 }, draggable:false, style:{ color:'white', background:'purple',} };

    const consumers = [];
    for (let i = 1; i<=dummyData.consumers.length; i+=1){
        consumers.push( {id:`${topic_id+i}`, data: { label: dummyData.consumers[i-1]}, targetPosition:'left', draggable:false, position: { x:0.8*width_adjustable, y:i*(height_adjustable/(dummyData.consumers.length+1))}});
        // ^ need to rewrite math for x, y placements
        connectingSegments.push({ id:`e${topic_id}-${topic_id+i}`, source:`${topic_id}`, target:`${topic_id+i}`, arrowHeadType:'arrowclosed', type:'smoothstep'})
    }
    console.log(consumers)
    console.log(connectingSegments)
    // const elementsTemp= producers.concat(topic).concat(consumers)//.concat(connectingSegments);
    const elements = [...producers, topic, ...consumers, ...connectingSegments]; // won't let me concat directly in line above... not sure why
    // const trying = producers.concat(connectingSegments) // TYPESCRIPT ERROR...

    // ^ Bring together all the elements (and arrows) into elements to pass into ReactFlow Component

    // const elements = [
    //     { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    //     // you can also pass a React Node as a label
    //     { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
    //     { id: 'e1-2', source: '1', target: '2', animated: true },
    //   ];


    return(
        <div>
            <ReactFlow elements={elements} className="bg-slate-300" style={{width:width_adjustable, height:height_adjustable}} />
        </div>   
         )
}

export default FlowChart;