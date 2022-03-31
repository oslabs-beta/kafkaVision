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

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title, 
  Tooltip, 
  Legend,
)

const BytesInGraph = (props) => {
  //Unpack connection state for query URL
  const {
    state: { connectionState },
  } = useContext(appContext);
  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;

  //Local state being rendered onto graph
  const [bytesIn, setBytesIn] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      label: 'Topic',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#22404c',
      borderColor: '#d2fdbb', 
      borderWidth: 1
    }],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [badQuery, setbadQuery] = useState(false);
  const [bytesInData, setBytesInData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Repeating query triggered on page load that gets list of all topics, selects the specific topic...
  // passed down to this component as props, and sets/resets data (state) that populates the graphs
  useEffect( () => {
    const query ='sum(rate(kafka_server_brokertopicmetrics_bytesinpersec[5m])) by (topic)';
    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const result = await json.json();

        //Selects data based on particular topic
        let newDatapoint = result.data.result.filter(s => s.metric.topic===props.fetchedTopicName);
        newDatapoint = newDatapoint[0].value[1];

        //Edgecase for if topic name is not found in query
        if (newDatapoint.length === 0){
          setbadQuery(true);

        //Allows state to recieve and discard metrics so there are only 10 datapoints at a time
        } else {
          setBytesInData(prevState => {
            let brokerNewState = [...prevState];
            brokerNewState.shift();
            brokerNewState.push(newDatapoint);
            return brokerNewState;
          })
        }
      }
      catch (error){
        console.log('ERROR IN BYTESIN GRAPH FETCH: ', error)
      }
    }

    //Allows graphs to update every second
    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 2000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []);

  //Sets graph properties on load
  useEffect(() => {
        setBytesIn({
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [{
            label: `${props.fetchedTopicName}`,
            data: bytesInData,
            backgroundColor: ['#d2fdbb'], 
            borderColor: ['#7cb55e'], 
            borderWidth: 1
          }],
        });

        //Tooltips from ChartJS for graph customization
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
      }, [bytesInData]);

  //Edgecasing which gets rendered to the page dependent on if a valid query was returned
  return (
    <div styles={{width:'300', length:'300'}}>
      {badQuery && <p className='text-fontGray/40 text-center'>
        Topic not found in Query
      </p>}   
      {!badQuery && <p className='text-fontGray/40 text-center'>
        Bytes In
      </p>}
      <Line data={bytesIn} options={chartOptions}/>  
    </div>
  )
}

export default BytesInGraph;