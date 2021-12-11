//const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
import * as selectors from "./selectors.js";
import * as data from "./getData.js";
import * as regionChart from "./regionChart.js";

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
      });
    });
    selectors.dropdownContent.appendChild(initialListItem);
  });
};

const fillMainData=(region)=>{
  let confirmed = data.ContinentsData[region].confirmed ;
  let deaths = data.ContinentsData[region].deaths ;
  let recovered = data.ContinentsData[region].recovered ;
  //TODO:MAKE IT DYNAMIC 
  
  document.querySelector(".totalDeaths").innerHTML="total Deaths : "+deaths ; 
  document.querySelector(".totalCases").innerHTML= "total Activen Cases : "+confirmed ; 
  document.querySelector(".totalrecovered").innerHTML= "total recovery : "+ recovered ; 

}
const createContinentsButtons = (worldsContinents) => {
  worldsContinents.forEach((element) => {
    let initialBtn = document.createElement("button");
    initialBtn.classList.add("Continentbtn");
    initialBtn.setAttribute("id", element);
    initialBtn.innerText = element;
    
    initialBtn.addEventListener("click", function (e) {
      //TODO:SOLVE THE BUG OF getting data , first click not working 
      e.target.disabled  = true ; 
      data.getCountriesByContinent(element).then(function (value) {
        regionChart.addChartData(element, value[0]);
        filldropdownContent(value[0]);
        fillMainData(element);

        /*console.log(data.ContinentsData[element].confirmed)
        console.log(data.ContinentsData[element].deaths)
        console.log(data.ContinentsData[element].recovered)
        console.log(data.ContinentsData)*/
        e.target.disabled  = false ;
      });
    
      if(true){
      }else {
        console.log(data.ContinentsData[element].countriesArr)
        regionChart.addChartData(element, data.ContinentsData[element].countriesArr);
        filldropdownContent(value[0]);
      }
      
    });
    selectors.ContinentsbtnsBox.appendChild(initialBtn);
  });
};
createContinentsButtons(data.worldsContinents);

const searchOnClick = () => {
  selectors.searchBtn.addEventListener("click", function () {
    console.log(selectors.searchText.value);
    data.searchCountry(selectors.searchText.value).then(function (value) {
      console.log(value);
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

