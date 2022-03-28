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

  const [CPU, setCPU] = useState({
    // labels: ['CPU Usage'],
    labels: ['Broker1', 'Broker2'], // 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Broker 1',
        data: [10, 10],
        backgroundColor: '#22404c', //lime green
        borderColor: '#d2fdbb', //dark green
        borderWidth: 1,
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([10, 10], [15, 15]); //changed this from [10, 15]

  useEffect(() => {
    //CPU Usage
    const query = 'irate(process_cpu_seconds_total[5m])*100';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query);
        const CPUData = await json.json(); // duplicate name but ok because it's in LEC
        // console.log(CPUData.data.result[0].value[1])
        let newState = [
          Math.floor(CPUData.data.result[0].value[1]),
          Math.floor(CPUData.data.result[1].value[1]),
        ];
        setCPUData(newState);
      } catch (error) {
        console.log('ERROR IN CPU GAUGE FETCH: ', error);
      }
    };

    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 1000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []);

  useEffect(() => {
    console.log('CPU DATA GAUGE: ', CPUData);
    setCPU({
      // labels: ['CPU Usage'],
      labels: ['Broker1', 'Broker2'], // 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          // label: 'Broker 1',
          data: [CPUData[0], CPUData[1]],
          backgroundColor: '#22404c', //lime green
          borderColor: '#d2fdbb', //dark green
          borderWidth: 1,
        },
      ],
    });

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
          // text: 'CPU Usage Gauge',
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
      <p>CPU Gauge</p>
      <Bar data={CPU} options={chartOptions} />
    </div>
  );
};

export default CPUGauge;
