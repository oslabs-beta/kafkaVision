import React, { useState, useEffect, useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { appContext } from '../../App.tsx';
import regeneratorRuntime from 'regenerator-runtime';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CPUGraph = () => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  //Local state being rendered onto graph
  const [chartOptions, setChartOptions] = useState({});
  const [CPUData, setCPUData] = useState([
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  ]);
  const [CPU, setCPU] = useState({
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: 'Broker 1',
        data: [5, 5, 5, 5, 5, 5],
        backgroundColor: '#22404c', 
        borderColor: '#d2fdbb', 
        borderWidth: 1,
      },
      {
        label: 'Broker 2',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#22404c', 
        borderColor: '#d2fdbb', 
      },
    ],
  });

  //Fetches data for CPU Usage on load
  useEffect(() => {
    const query = 'irate(process_cpu_seconds_total[5m])*100';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query);
        const CPUData = await json.json();
        
        setCPUData((prevState) => {
          //Allows the state's array to discard old data points
          let broker1NewState = prevState[0];
          let broker2NewState = prevState[1];
          broker1NewState.shift();
          broker2NewState.shift();

          //Filtering query for brokers  
          let filtered = CPUData.data.result.filter(result => (result.metric.job = "kafka-broker"));
          
          //Loading newer data points to state
          broker1NewState.push(filtered[0].value[1]);
          broker2NewState.push(filtered[1].value[1]);
          let newState = [broker1NewState, broker2NewState];
          return newState;
        });
      } catch (error) {
        console.log('ERROR IN CPU GRAPH FETCH: ', error);
      }
    };

    //Allows graphs to update every second
    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 1000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []);

  //Sets graph properties on load
  useEffect(() => {
    setCPU({
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      datasets: [
        {
          label: 'Broker 1',
          data: CPUData[0],
          backgroundColor: ['#d2fdbb'], 
          borderColor: ['#7cb55e'], 
          borderWidth: 1,
        },
        {
          label: 'Broker 2',
          data: CPUData[1],
          backgroundColor: '#22404c', 
          borderColor: '#03dac5', 
        },
      ],
    });

    //Tooltips from ChartJS for customization
    setChartOptions({
      responsive: false,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
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
            text: 'Cores',
          },
        },
      },
    });
  }, [CPUData]);

  return (
    <div>
      <p>CPU Usage</p>
      <Line 
        data={CPU} 
        options={chartOptions} />
    </div>
  );
};

export default CPUGraph;
