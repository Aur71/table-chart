import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Chart = ({ data }) => {
  const filteredData = data.filter((state) => state['ID Year'] === 2020);
  const totalPopulation = filteredData.reduce(
    (sum, state) => sum + parseInt(state.Population),
    0
  );
  const labels = filteredData.map((state) => state.State);
  const populations = filteredData.map((state) => {
    const percentage = (parseInt(state.Population) / totalPopulation) * 100;
    return percentage.toFixed(2);
  });
  const backgroundColors = Array.from({ length: labels.length }, () =>
    getRandomColor()
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: populations,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div className='chart'>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = chartData.labels[context.dataIndex];
                  const value = chartData.datasets[0].data[context.dataIndex];
                  return `${label}: ${value}%`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Chart;
