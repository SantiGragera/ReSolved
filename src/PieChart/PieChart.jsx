import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip)

const PieChart = ({data}) => {
  return <Pie data={data} />
}

export default PieChart