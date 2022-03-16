import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale,
  BarElement,
  LineController, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import regeneratorRuntime from "regenerator-runtime";
// import { timeStamp } from 'console';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  LineController,
  Title, 
  Tooltip, 
  Legend,
)

//Don't forget to change the query link!
const queryLink = 'https://9090-kayhill-cpdemo-4gbgmdfwzzh.ws-us34.gitpod.io/api/v1/query?query='; //TUESDAY 3PM
// let query = '';

const CPUGauge = () => {
  const [CPU, setCPU] = useState({
    // labels: ['CPU Usage'],
    labels: ['Broker1', 'Broker2'],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Broker 1',
      data: [10],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1
    },
    {
      label: 'Broker 2',
      data: [15],
      backgroundColor: 'orange', 
      borderColor:' red',
    }],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([10, 15]);

  
  useEffect( () => {
    //JVM Memory Used Query
    const query = 'sum without(area)(jvm_memory_bytes_used{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"})';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const CPUData = await json.json(); // duplicate name but ok because it's in LEC
        // console.log(CPUData.data.result[0].value[1])
        let newState = [Math.floor(CPUData.data.result[0].value[1]), Math.floor(CPUData.data.result[1].value[1])]
        setCPUData(newState)
      }
      catch (error){
        console.log('ERROR IN CPU GRAPH FETCH: ', error)
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
          labels: ['Broker1', 'Broker2'],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
    <div styles={{width:'600', length:'400'}} >
      <div>test</div>
      {/* <div>{JSON.stringify(CPUData)}</div> */}
      <Bar data={CPU} options={chartOptions}/>  
    </div>
  )
}

export default CPUGauge;