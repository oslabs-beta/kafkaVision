import React, { useState, useEffect, useContext } from 'react';
import {
  Chart,
  CategoryScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import regeneratorRuntime from 'regenerator-runtime';
import { appContext } from '../../App.tsx';

Chart.register(
  CategoryScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const CPUGauge = () => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
  } = useContext(appContext);

  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  //Local state being rendered onto graph
  const [chartOptions, setChartOptions] = useState({});
  const [CPUData, setCPUData] = useState([10, 10], [15, 15]); 
  const [CPU, setCPU] = useState({
    labels: ['Broker1', 'Broker2'], 
    datasets: [
      {
        label: 'Broker 1',
        data: [10, 10],
        backgroundColor: '#22404c', 
        borderColor: '#d2fdbb', 
        borderWidth: 1,
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
        
        //Filtering query for brokers
        const filtered = CPUData.data.result.filter(result => (result.metric.job = "kafka-broker"));
  
        //Rounding metrics returned and setting to state
        const newState = [
          Math.floor(filtered[0].value[1]),
          Math.floor(filtered[1].value[1]),
        ];
        setCPUData(newState);
      } catch (error) {
        console.log('ERROR IN CPU GAUGE FETCH: ', error);
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
    console.log('CPU DATA GAUGE: ', CPUData);
    setCPU({
      labels: ['Broker1', 'Broker2'], 
      datasets: [
        {
          data: [CPUData[0], CPUData[1]],
          backgroundColor: '#22404c', 
          borderColor: '#d2fdbb', 
          borderWidth: 1,
        },
      ],
    });

    //Tooltips from ChartJS for customization
    setChartOptions({
      responsive: false,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
          position: 'right',
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
      <Bar data={CPU} options={chartOptions} />
    </div>
  );
};

export default CPUGauge;
