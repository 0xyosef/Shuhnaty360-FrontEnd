import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip);

interface PieChartProps {
  data: any;
}

const PieChart = React.memo(({ data }: PieChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw} شحنة`;
          },
        },
      },
    },
    cutout: "50%",
    offset: 0,
    radius: 150,
    rotation: 45,
    borderRadius: 5,
    innerRadius: 100,
    spacing: -5,
  };

  const total = data.datasets[0].data.reduce(
    (a: number, b: number) => a + b,
    0,
  );

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <Doughnut data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-Rubik text-[#333]">
          {total}
          <div className="font-Rubik text-2xl">شحنة</div>
        </div>
      </div>
    </div>
  );
});

export default PieChart;
