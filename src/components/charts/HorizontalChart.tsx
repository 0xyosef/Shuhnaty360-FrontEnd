import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const HorizontalChart = React.memo(({ series, categories }: any) => {
  const isMobileScreen = window.innerWidth < 640;

  const options: ApexOptions = {
    chart: {
      height: 350,
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: true,
        barHeight: "50%",
        colors: {},
      },
    },
    colors: ["#B3E5BD", "#E6E6E6", "#2E853F", "#FEDE9A", "#CD2026", "#F8D3D4"],
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: "#333",
          fontSize: isMobileScreen ? "14px" : "16px",
          fontFamily: "Almarai, sans-serif",
        },
      },
      tooltip: {
        enabled: false,
      },
      reversed: true,
    },
    tooltip: {
      enabled: true,
      // followCursor: true,
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: false,
      },
      fixed: {
        enabled: false,
      },
      y: {
        formatter: function (val: number) {
          return val + " شحنة";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      itemMargin: {
        horizontal: isMobileScreen ? 10 : 20,
      },
      inverseOrder: true,
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        size: 8,
        shape: "circle",
      },
      fontFamily: "Rubik, sans-serif",
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="margin-auto">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
});

export default HorizontalChart;
