import * as regionchartData from "./getData.js";

//setup
const labels = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "active cases",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [], //getChartData("cases"),
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "rgb(255, 99, 132)",
    },
  ],
};
//config
//options.scales.x.title.text
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
          color: "blue",
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          color: "blue",
          font: {
            size: 10,
          },
        },
      },
    },
  },
};
//start
const regionChart = new Chart(document.getElementById("regionChart"), config);

export const addChartData = (region, data) => {
  let namesArr = [];
  let CasesArr = [];
  console.log() 
 data.forEach(element => {
    namesArr.push(element.name);
    CasesArr.push(element.confirmed);
     
 });
 regionChart.options.scales.x.title.text= `${region} current active cases`
  regionChart.data.datasets[0].data = CasesArr;
  regionChart.data.labels = namesArr;
  regionChart.update();

  
};
