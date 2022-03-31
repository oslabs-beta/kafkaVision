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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const JVMGraph = () => {
  //Unpack connection state for query URL
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  //Local state being rendered onto Graph
  const [chartOptions, setChartOptions] = useState({});
  const [JVMData, setJVMData] = useState([
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  ]);
  const [JVM, setJVM] = useState({
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

  //Fetches data for JVM Memory on load
  useEffect(() => {
    const query = 'sum without(area)(jvm_memory_bytes_used)';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query);
        const JVMData = await json.json();
        
        setJVMData((prevState) => {
         //Allows the state's array to discard old data points
          let broker1NewState = prevState[0];
          let broker2NewState = prevState[1];
          broker1NewState.shift();
          broker2NewState.shift();

          //Filtering query for brokers
          let filtered = JVMData.data.result.filter(result => (result.metric.job = "kafka-broker"));
          
          //Loading newer data points to state
          broker1NewState.push(filtered[0].value[1]);
          broker2NewState.push(filtered[1].value[1]);
          let newState = [broker1NewState, broker2NewState];
          return newState;
        });
      } catch (error) {
        console.log('ERROR IN JVM GRAPH FETCH: ', error);
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
    setJVM({
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      datasets: [
        {
          label: 'Broker 1',
          data: JVMData[0],
          backgroundColor: ['#d2fdbb'], 
          borderColor: ['#7cb55e'], 
          borderWidth: 1,
        },
        {
          label: 'Broker 2',
          data: JVMData[1],
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
            text: 'Memory (MiB)',
          },
        },
      },
    });
  }, [JVMData]);

  return (
    <div>
      <p>JVM Memory Usage</p>
      <Line data={JVM} options={chartOptions} />
    </div>
  );
};

export default JVMGraph;
