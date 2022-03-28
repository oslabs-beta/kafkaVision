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
// import { timeStamp } from 'console';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GCGraph = () => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  const [CPU, setCPU] = useState({
    // labels: ['CPU Usage'],
    labels: [1, 2, 3, 4, 5, 6], // 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Broker 1',
        data: [5, 5, 5, 5, 5, 5],
        backgroundColor: '#22404c', //lime green
        borderColor: '#d2fdbb', //dark green
        borderWidth: 1,
      },
      {
        label: 'Broker 2',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#22404c', //lime green
        borderColor: '#d2fdbb', //dark green
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  ]);

  // const controller = new AbortController();

  useEffect(() => {
    //JVM Memory
    const query = 'sum without(gc)(rate(jvm_gc_collection_seconds_sum[5m]))';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query);
        const CPUData = await json.json();
        console.log(CPUData.data.result[0].value[1]);
        setCPUData((prevState) => {
          console.log('GC state changed');
          console.log(prevState);
          let broker1NewState = prevState[0];
          let broker2NewState = prevState[1];
          broker1NewState.shift();
          broker2NewState.shift();
          broker1NewState.push(CPUData.data.result[0].value[1]);
          broker2NewState.push(CPUData.data.result[1].value[1]);
          let newState = [broker1NewState, broker2NewState];
          return newState;
        });
      } catch (error) {
        console.log('ERROR IN JVM GRAPH FETCH: ', error);
      }
    };

    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 1000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []);

  useEffect(() => {
    setCPU({
      // labels: ['CPU Usage'],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Broker 1',
          data: CPUData[0],
          backgroundColor: ['#d2fdbb'], //lime green
          borderColor: ['#7cb55e'], //dark green
          borderWidth: 1,
        },
        {
          label: 'Broker 2',
          data: CPUData[1],
          backgroundColor: '#22404c', //slateBlue
          borderColor: '#03dac5', //seafoam
        },
      ],
    });

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
            text: '% of Time in GC',
          },
        },
      },
    });
  }, [CPUData]);

  return (
    <div styles={{ width: '600', length: '400' }}>
      <div>Time Spent in GC</div>
      {/* <div>{JSON.stringify(CPUData)}</div> */}
      <Line data={CPU} options={chartOptions} />
    </div>
  );
};

export default GCGraph;
