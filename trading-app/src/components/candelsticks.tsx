import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  prices: [number, number][];
}

const LineChart = ({ prices }: LineChartProps) => {
  const data = {
    labels: prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: prices.map((price) => price[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
