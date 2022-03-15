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
const queryLink = 'https://9090-kayhill-cpdemo-fdie0tpzrnk.ws-us34.gitpod.io/api/v1/query?query='; //TUESDAY 12PM
// let query = '';

const CPUGraph = () => {
  const [CPU, setCPU] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([1]);

  // const controller = new AbortController();

  // useEffect(() => {
  //   // const controller = new AbortController();
  //   let incomingCPUData = 0;
  //    setInterval( async () => {
  //     query = 'irate(process_cpu_seconds_total{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"}[5m])*100';
  //     console.log("in interval")
  //     const data = await fetch(queryLink + query)
  //     console.log(data)
  //       .then(data => {
  //         console.log("in first then")
  //         return data.json()
  //       })
  //       .then(result => {
  //         console.log("in second then")
  //         console.log(result.data.result[0].value[1])
  //         incomingCPUData = result.data.result[0].value[1]
  //       })
  //       setCPUData( prevState => {
  //         console.log("in set state")
  //         let newState = [...prevState]
  //         if (newState.length > 50) newState.shift();
  //         newState.push(result.data.result[0].value[1]);
  //         return newState
  //       }            
  //         ) 
  //     }, 3000)
  //     // return () => controller.abort()
  //   }, 
    
  //   []
  // );

  useEffect( () => {
    const query = 'irate(process_cpu_seconds_total{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"}[5m])*100';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const CPUData = await json.json();
        console.log(CPUData.data.result[0].value[1])
        setCPUData(prevState => {
          console.log("prev state")
          console.log(prevState)
          let newState = [...prevState]
          console.log(newState)
          if (newState.length > 7) newState.shift();
          newState.push(CPUData.data.result[0].value[1]);
          return newState
        })
      }
      catch (error){
        console.log('ERROR IN CPU GRAPH FETCH: ', error)
      }
    }

    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 2000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []
)




  useEffect(() => {
    query = 'irate(process_cpu_seconds_total{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"}[5m])*100';
    fetch(queryLink + query)
      .then(data => data.json())
      .then(result => {
        console.log('CPU GRAPH DATA: ', result);
        setCPU({
          labels: ['CPU Usage'],
          datasets: [{
            label: 'Broker 1',
            data: CPUData,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
          },
          {
            label: 'Broker 2',
            data: [47, 52, 67, 58, 9, 50],
            backgroundColor: 'orange', 
            borderColor:' red',
          }],
        });
        setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
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
      })
      .catch(err => {
        console.log('ERROR IN CPU GRAPH USEEFFECT: ', err);
      });
    }, []);



  return (
    <div>
      <div>test</div>
      <div>{JSON.stringify(CPUData)}</div>
      <Line data={CPU} options={chartOptions}/>  
    </div>
  )
}

export default CPUGraph;