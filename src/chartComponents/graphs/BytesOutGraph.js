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

const BytesOutGraph = (props) => {
  //UNPACK CONNECTION STATE (TO GET PROMETHEUS URL)
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;
  console.log("bytesout rendered with props:", props)

  const [bytesOut, setBytesOut] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      label: 'Topic',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#22404c', //lime green
      borderColor: '#d2fdbb', //dark green
      borderWidth: 1
    }
    // ,
    // {
    //   label: 'Broker 2',
    //   data: [0,0,0,0,0,0],
    //   backgroundColor: '#22404c', //lime green
    //   borderColor: '#d2fdbb', //dark green
    // }
  ],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [badQuery, setbadQuery] = useState(false);
  const [bytesOutData, setBytesOutData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect( () => {
    const query ='sum(rate(kafka_server_brokertopicmetrics_bytesoutpersec[5m])) by (topic)';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const result = await json.json();
        console.log("this tie around", result)
        // console.log(bytesOutData.data.result[0].value[1])
        let newDatapoint = result.data.result.filter(s => s.metric.topic===props.fetchedTopicName);
        console.log("ok im here")
        console.log(newDatapoint)
        if (newDatapoint.length === 0){ // if not found in query
          console.log("that string is not found")
          setbadQuery(true);
        }else{
          console.log("new datapoint in else", newDatapoint)
          console.log('went in else')
          newDatapoint = newDatapoint[0].value[1];
          setBytesOutData(prevState => {
            let brokerNewState = [...prevState];
            brokerNewState.shift();
            brokerNewState.push(newDatapoint);
            return brokerNewState;
          })
        }
      }
      catch (error){
        console.log('ERROR IN BYTESOUT GRAPH FETCH: ', error)
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
        setBytesOut({
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [{
            label: `${props.fetchedTopicName}`,
            data: bytesOutData,
            backgroundColor: ['#d2fdbb'], //lime green
            borderColor: ['#7cb55e'], //dark green
            borderWidth: 1
          }
          // ,
          // {
          //   label: 'Broker 2',
          //   data: bytesOutData[1],
          //   backgroundColor: '#22404c',  //slateBlue
          //   borderColor: '#03dac5', //seafoam
          // }
        ],
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
                text: 'Bytes',
              }
            },
          },  
        })
      }, [bytesOutData]);


  return (
    <div styles={{width:'300', length:'300'}}>
      {badQuery && <p className='text-fontGray/40 text-center'>
        Topic not found in Query
      </p>  }   
      {!badQuery && <p className='text-fontGray/40 text-center'>
        Bytes Out
      </p> }
      <Line data={bytesOut} options={chartOptions}/>  
    </div>
  )
}

export default BytesOutGraph;