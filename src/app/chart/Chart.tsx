import React from 'react';
import data from './../utils/data.json'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = data.map(item => item.day);
 
interface ChartProps {
  text: string;
  label: string;
  data: number[];
}

export default function ChartComponent(props: ChartProps): JSX.Element {
  const { text, label, data } = props;

  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text,
          },
        },
      }}
      data={{
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
      }}
    />
  );
};