import Chart from 'chart.js';
import { chartNodeID } from '../../constants';
import { FC, useEffect, useRef } from 'react';

type LineChartProps = {
  data: string[];
};

// @todo: memo to avoid unnecessary rerenders?
export const LineChart: FC<LineChartProps> = ({ data }) => {
  const chartNode = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartNode.current) {
      console.log('NEW CHART', data);
      new Chart(chartNode.current, {
        type: 'line',
        data: {
          datasets: [{
            label: '# of Stars',
            data: data.map((timestamp, i) => ({
              t: new Date(timestamp),
              y: i,
            })),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            }],
            xAxes: [{
              type: 'time',
              time: {
                unit: 'year',
              },
            }],
          },
        },
      });
    }
  }, [data]);

  return (
    <canvas ref={chartNode} id={chartNodeID} width="600" height="400" />
  );
};
