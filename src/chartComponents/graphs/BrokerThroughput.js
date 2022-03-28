import React, { useState, useEffect, useContext } from 'react';
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
import { appContext } from '../../App.tsx';
import regeneratorRuntime from "regenerator-runtime";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title, 
  Tooltip, 
  Legend,
)

const BrokerThroughputGraph = () => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  const [throughput, setThroughput] = useState({
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [{
      label: 'Broker 1',
      data: [5, 5, 5, 5, 5, 5],
      backgroundColor: '#22404c', //lime green
      borderColor: '#d2fdbb', //dark green
      borderWidth: 1
    },
    {
      label: 'Broker 2',
      data: [0,0,0,0,0,0],
      backgroundColor: '#22404c', //lime green
      borderColor: '#d2fdbb', //dark green
    }],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [throughputData, setThroughputData] = useState([[10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]]);

  useEffect( () => {
    // const query = 'sum(rate(kafka_server_brokertopicmetrics_bytesoutpersec[5m]))'; //query from grafana not working?
    const query ='sum without(topic)(rate(kafka_server_brokertopicmetrics_bytesoutpersec[5m]))'; //bytesout graph query works

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const throughputData = await json.json();
        console.log(throughputData.data.result[0].value[1])
        setThroughputData(prevState => {
          console.log("state changed")
          console.log(prevState)
          let broker1NewState = prevState[0];
          let broker2NewState = prevState[1];
          broker1NewState.shift();
          broker2NewState.shift();
          broker1NewState.push(throughputData.data.result[0].value[1]);
          broker2NewState.push(throughputData.data.result[1].value[1]);
          let newState = [ broker1NewState, broker2NewState];
          return newState
        })
      }
      catch (error){
        console.log('ERROR IN THROUGHPUT GRAPH FETCH: ', error)
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
        setThroughput({
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [{
            label: 'Broker 1',
            data: throughputData[0],
            backgroundColor: ['#d2fdbb'], //lime green
            borderColor: ['#7cb55e'], //dark green
            borderWidth: 1
          },
          {
            label: 'Broker 2',
            data: throughputData[1],
            backgroundColor: '#22404c',  //slateBlue
            borderColor: '#03dac5', //seafoam
          }],
        });

        setChartOptions({
          responsive: false,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom"
            }, 
            title: {
              display: true, 
            }, 
          }, 
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Bytes/s',
              }
            },
          },  
        })
      }, [throughputData]);


  return (
    <div styles={{width:'300', length:'300'}}>
      <div>Broker Network Throughput</div>
      <Line data={throughput} options={chartOptions}/>  
    </div>
  )
}

export default BrokerThroughputGraph;