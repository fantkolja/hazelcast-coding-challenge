import Chart from 'chart.js';
import { chartNodeID } from '../../constants';
import { LineChartDataItem } from '../../types';
import { useEffect, useRef } from 'react';

type LineChartProps = {
  // data: LineChartDataItem[];
};

export const LineChart = ({}) => {
  const chartNode = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartNode.current) {
      new Chart(chartNode.current, {
        type: 'line',
        data: {
          datasets: [{
            label: '# of Stars',
            data: [{
              t: new Date('2016-11-01T17:27:47Z'),
              y: 0,
            }, {
              t: new Date('2017-04-06T08:40:50Z'),
              y: 1,
            }, {
              t: new Date('2017-05-22T12:24:12Z'),
              y: 2,
            }, {
              t: new Date('2020-11-20T17:36:51Z'),
              y: 3,
            }, {
              t: new Date('2020-12-26T22:18:05Z'),
              y: 4,
            }],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
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
  }, []);

  return (
    <canvas ref={chartNode} id={chartNodeID} width="600" height="400" />
  );
};
