//const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
const status = document.querySelector(".status");
const europe = document.querySelector(".europe");
const asia = document.querySelector(".asia");
const africa = document.querySelector(".africa");
const americas = document.querySelector(".americas");
const oceania = document.querySelector(".oceania");
const dropdownContent = document.querySelector(".dropdownContent");

import {worldsContinents,ContinentsData,globalData,sellectedCountry,GlobalData,fillCountryCovidData,
    calculateContinentCovidData,getCountryCovidData,fillcountriesData,getCountriesByContinent,searchCountry,
} from "./getData.js" 

const filldropdownContent= (countriesArr)=>{
    dropdownContent.innerHTML=""
    countriesArr.forEach(element => {
        let initialListItem = document.createElement("a");
        initialListItem.classList.add("countryInTheList");
        initialListItem.setAttribute("id",element.code)
        initialListItem.innerText= element.name ;
        dropdownContent.appendChild(initialListItem);  
    });
   
}
europe.addEventListener("click",function (){
    console.log("Europe");

    getCountriesByContinent("Europe").then(
        function(value) {
            console.log(value[0]);
            filldropdownContent(value[0]);
        }
      );
     
    
})







