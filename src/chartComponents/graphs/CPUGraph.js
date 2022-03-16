import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';


const LineChart = () => {
  const CPUState = () => {
    const [CPUData, setCPUData] = useState();
  }

    //logic for producing CPU Usage
    const req = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"

      }, 
      body: JSON.stringify({
        query: `query:"irate(process_cpu_seconds_total{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"}[5m])*100`,
      }),
    }
  

  //fetch request
  fetch('link')
    .then(res => {
      console.log('CPU DATA: ', res);
      //manipulate data 

    })
    .catch(err => {
      console.log('CPU DATA ERROR: ', err)
    })

  return (
    <div>
      <Line
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'Quantity',
            data: [47, 52, 67, 58, 9, 50],
            backgroundColor: 'orange', 
            borderColor:' red',
          }
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false, 
          // scales: {
          //   yAxes: [{
          //     ticks: {
          //       beginAtZero: true,
          //     }
          //   }]
          // },
          legend: {
            labels: {
              fontColor: 'fontGray' //should override global font property but just make sure
            }
          }
        }}
      />  
    </div>
  )
}

export default LineChart;