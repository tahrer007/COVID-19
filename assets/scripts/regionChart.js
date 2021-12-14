import * as regionchartData from "./getData.js";

//setup
const labels = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "deaths",
      data: [], //getChartData("cases"),
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgb(255, 99, 132)"],
      borderWidth: 2,
    },

    {
      label: "active cases",
      data: [], //getChartData("cases"),
     
      backgroundColor: ["rgba(255, 205, 86, 0.2)"],
      borderColor: ["rgb(255, 205, 86)"],
      borderWidth: 2,
    },

    {
      label: "recoved",
      data: [], //getChartData("cases"),
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgb(75, 192, 192)"],
      borderWidth: 2,
    },
  ],
};
//config
//options.scales.x.title.text
const config = {
  type: "bar",
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
  let deathsArr = [];
  let recoveryArr = [];
  data.forEach((element) => {
    namesArr.push(element.name);
    deathsArr.push(element.data.deaths);
    CasesArr.push(element.data.confirmed);
    recoveryArr.push(element.data.recovered);
  });
  regionChart.options.scales.x.title.text = `${region} current active cases`;
  regionChart.data.datasets[0].data = deathsArr;
  regionChart.data.datasets[1].data = CasesArr;
  regionChart.data.datasets[2].data = recoveryArr;
  regionChart.data.labels = namesArr;

  regionChart.update();
};
