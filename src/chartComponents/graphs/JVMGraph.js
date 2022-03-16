import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,  
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import regeneratorRuntime from "regenerator-runtime";
// import { timeStamp } from 'console';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title, 
  Tooltip, 
  Legend,
)

//Don't forget to change the query link!
const queryLink = 'https://9090-kayhill-cpdemo-4gbgmdfwzzh.ws-us34.gitpod.io/api/v1/query?query='; //TUESDAY 3PM
// let query = '';

const JVMGraph = () => {
  const [CPU, setCPU] = useState({
    // labels: ['CPU Usage'],
    labels: [1, 2, 3, 4, 5, 6],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Broker 1',
      data: [5, 5, 5, 5, 5, 5],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1
    },
    {
      label: 'Broker 2',
      data: [0,0,0,0,0,0],
      backgroundColor: 'orange', 
      borderColor:' red',
    }],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([[10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]]);

  // const controller = new AbortController();



  useEffect( () => {
    //JVM Memory
    const query = 'sum without(area)(jvm_memory_bytes_used{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const CPUData = await json.json();
        console.log(CPUData.data.result[0].value[1])
        setCPUData(prevState => {
          console.log("jvm state changed")
          console.log(prevState)
          let broker1NewState = prevState[0];
          let broker2NewState = prevState[1];
          broker1NewState.shift();
          broker2NewState.shift();
          broker1NewState.push(CPUData.data.result[0].value[1]);
          broker2NewState.push(CPUData.data.result[1].value[1]);
          let newState = [ broker1NewState, broker2NewState];
          return newState
        })
      }
      catch (error){
        console.log('ERROR IN JVM GRAPH FETCH: ', error)
      }
    }

    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 1000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []
)


  useEffect(() => {
    setCPU({
      // labels: ['CPU Usage'],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Broker 1',
        data: CPUData[0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
      },
      {
        label: 'Broker 2',
        data: CPUData[1],
        backgroundColor: 'orange', 
        borderColor:' red',
      }],
    });

    setChartOptions({
      responsive: false,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top"
        }, 
        title: {
          display: true, 
          text: 'CPU Usage',
        }
      }
    })
  }, [CPUData]);



  return (
    <div styles={{width:'600', length:'400'}} className='bg-red-900'>
      <div>JVM Memory Usage</div>
      {/* <div>{JSON.stringify(CPUData)}</div> */}
      <Line data={CPU} options={chartOptions}/>  
    </div>
  )
}

export default JVMGraph;
