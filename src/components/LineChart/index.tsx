import Chart, { LinearTickOptions } from 'chart.js';
import { chartNodeID } from '../../constants';
import { FC, memo, useEffect, useRef } from 'react';
import { RepositoryExpandedDetailsStar } from '../../types';
import { getOptimalTimeSpan } from '../../services/utils';

type LineChartProps = {
  data: RepositoryExpandedDetailsStar[];
};

export const LineChart: FC<LineChartProps> = memo(({ data }) => {
  const chartNode = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartNode.current) {

      new Chart(chartNode.current, {
        type: 'line',
        data: {
          datasets: [{
            label: '# of Stars',
            data: data.map(({ starredAt, starsCount }) => ({
              t: new Date(starredAt),
              y: starsCount,
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
                precision: 0,
                // don't like those "ases" but seems it's the only option
                // to specify precision for chart.js d.ts file
              } as LinearTickOptions,
            }],
            xAxes: [{
              type: 'time',
              time: {
                unit: getOptimalTimeSpan(data),
              },
            }],
          },
        },
      });
    }
  }, [data]);

  return (
    <canvas ref={chartNode} id={chartNodeID} width="600" height="250" />
  );
  // not the case for current application but in the future might be a thin place for performance
}, (prev: LineChartProps, next: LineChartProps) => {
  return prev.data.every((ts, i) => ts === next.data[i]);
});
