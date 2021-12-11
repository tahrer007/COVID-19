import * as chartData from "./getData.js";

//setup
const labels = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "daily new deaths",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [], //getChartData("deaths"),
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "daily new cases",
      backgroundColor: "blue",
      borderColor: "blue",
      data: [],
      pointRadius:5,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "blue",
    },
  ],
};
//config
const config = {
  type: "line",
  data: data,
  options: {
    tooltips: {
      /*callbacks:{

        }*/
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 20,
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "world last seven days deaths and new cases ",
          color: "#911",
          font: {
            family: "Comic Sans MS",
            size: 30,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },

        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          color: "red",
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          color: "red",
          font: {
            size: 10,
          },
        },
      },
    },
  },
};
//start
const myChart = new Chart(document.getElementById("myChart"), config);

const addChartData = () => {
  chartData.getGlobalData().then(function (value) {
    myChart.data.datasets[0].data = value.NewDeaths;
    myChart.data.datasets[1].data = value.NewConfrimed;
    myChart.data.labels = value.date;
    myChart.update();
  });
};
addChartData();
