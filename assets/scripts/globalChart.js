import * as chartData from "./getData.js";
import * as start from "./start.js";
import * as elementSelctors from "./selectors.js";

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
const globalChart = new Chart(document.getElementById("globalChart"), config);

const addChartData = () => {
  chartData.getGlobalData().then(function (value) {
    globalChart.data.datasets[0].data = value.NewDeaths;
    globalChart.data.datasets[1].data = value.NewConfrimed;
    globalChart.data.labels = value.date;
    globalChart.update();
   
    document.querySelector(".totalDeaths").innerHTML = "total Deaths : " + chartData.currentGlobalData.deaths;
   document.querySelector(".totalCases").innerHTML =
    "total Activen Cases : " +chartData.currentGlobalData["active"];
   
   //currentGlobalData["active"] = globalData[0].active;
    //currentGlobalData["deaths"] = globalData[0].deaths;
  
  });
  console.log(chartData.currentGlobalData)

};
addChartData();
