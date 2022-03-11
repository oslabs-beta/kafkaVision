import React from 'react';
// import Chart from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const chart = document.getElementById('myChart');

const HealthMetricsChart = new Chart(chart, {
  type: 'doughnut',
  data: {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'Cluster Health Metrics',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});

export default HealthMetricsChart;