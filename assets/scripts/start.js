//const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
import * as selectors from "./selectors.js";
import * as data from "./getData.js";
import * as regionChart from "./regionChart.js";
const fillCountryStatistcs = (countryData) => {
  selectors.countryDataBox.innerHTML = "";
  console.log("tttttt");
  console.log(countryData);
  for (const key in countryData) {
    if (key === "name" || key === "code") continue;
    let initialListItem = document.createElement("div");
    initialListItem.classList.add("countryDataItem");
    initialListItem.innerHTML = `${key} : ${countryData[key]}`;
    selectors.countryDataBox.appendChild(initialListItem);
  }
  selectors.title.innerHTML = countryData.name;
};
const filldropdownContent = (countriesArr) => {
  selectors.dropdownContent.innerHTML = "";
  countriesArr.forEach((element) => {
    let initialListItem = document.createElement("a");
    initialListItem.classList.add("countryInTheList");
    initialListItem.setAttribute("id", element.code);
    initialListItem.innerText = element.name;
    initialListItem.addEventListener("click", function () {
      data.getCountryCovidData(element.code, true, "").then(function (value) {
        console.log(value);
        fillCountryStatistcs(value);
      });
    });
    selectors.dropdownContent.appendChild(initialListItem);
  });
};

const fillMainData = (region) => {
  let confirmed = data.ContinentsData[region].confirmed;
  let deaths = data.ContinentsData[region].deaths;
  let recovered = data.ContinentsData[region].recovered;
  //TODO:MAKE IT DYNAMIC

  document.querySelector(".totalDeaths").innerHTML = "total Deaths : " + deaths;
  document.querySelector(".totalCases").innerHTML =
    "total Activen Cases : " + confirmed;
  document.querySelector(".totalrecovered").innerHTML =
    "total recovery : " + recovered;
};


const createContinentsButtons = (worldsContinents) => {
  worldsContinents.forEach((element) => {
    let initialBtn = document.createElement("button");
    initialBtn.classList.add("Continentbtn");
    initialBtn.setAttribute("id", element);
    initialBtn.innerText = element;

    initialBtn.addEventListener("click", function (e) {
      //TODO:SOLVE THE BUG OF getting data , first click not working
      e.target.disabled = true;
      data.getCountriesByContinent(element).then(function (value) {
        selectors.globalChart.style.visibility = "hidden";
        selectors.regionChart.style.visibility = "visible";
        //console.log(data.ContinentsData[element].countriesArr[0])
        //console.log(data.ContinentsData[element].countriesArr[0].length)
        console.log(Object.keys(value[0]).length)
        console.log(value[0])
        regionChart.addChartData(element, value[0]);
        filldropdownContent(value[0]);
        fillMainData(element);
        e.target.disabled = false;
      });
    });
    selectors.ContinentsbtnsBox.appendChild(initialBtn);
  });
};
createContinentsButtons(data.worldsContinents);

const searchOnClick = () => {
  selectors.searchBtn.addEventListener("click", function () {
    console.log(selectors.searchText.value);
    data.searchCountry(selectors.searchText.value).then(function (value) {
      fillCountryStatistcs(value);
    });
  });
};
const searchHitEnter = () => {
  selectors.searchText.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      selectors.searchBtn.click();
    }
  });
};

searchOnClick();
searchHitEnter();
