import React, { useEffect } from 'react';
import { Chart, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
Chart.register( Tooltip, Title, ArcElement, Legend);


//DOUGHNUT ====================================
const data = {
  datasets: [{
    data: [10, 20, 30],
    backgroundColor: [
      'red', 
      'blue',
      'yellow'
    ]
  }],
  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    'Red',
    'Yellow',
    'Blue'
  ]
};

const DonutGraph = () => {
  

  const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch('')
  //       .then(data => {
  //         console.log('DATA: ', data);
  //         data.json();
  //       })
  //       .then((res) => {
  //         console.log('RES: ', res);
          
  //       })
  //       .catch(e => {
  //         //error stuffs
  //       })
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="h-1/2 w-1/2">
      <Doughnut 
        data={data}
        />
    </div>
  )
};

export default DonutGraph;













// const HealthMetricsChart = () => {
//   const data = {
//     labels: ['Mon','Tue','Wed','Thurs','Fri'],
//     datasets: [
//         {
//           label: 'Attendance for Week 1',
//           data: [25,24,25,25,3],
//           borderColor: ['rgba(255,206,86,0.2)'],
//           backgroundColor: ['rgba(232,99,132,1)',
//           'rgba(232,211,6,1)',
//           'rgba(54,162,235,1)',
//           'rgba(255,159,64,1)',
//           'rgba(153,102,255,1)' ],
//           pointBackgroundColor: 'rgba(255,206,86,0.2)',
//         }

//     ]
//   }

//   const options = {
//     plugins: {
//         title: {
//             display: true,
//             text: 'Cluster Health Metrics',
//             color:'blue',
//             font: {
//                 size: 34
//             },
//             padding:{
//                 top: 30,
//                 bottom: 30
//             },
//             responsive: true,
//             animation: {
//                 animateScale: true,
//             }
//         }
//     }
//   }

//   return (
//     <div>
//       <Doughnut data={data} options={options} />
//     </div>
//   )
// }



// const chart = document.getElementById('myChart');

// const HealthMetricsChart = new Chart(chart, {
//   type: 'doughnut',
//   data: {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'Cluster Health Metrics',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   },
  
// });

