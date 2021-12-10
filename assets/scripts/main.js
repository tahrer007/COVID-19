//const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
import * as selectors from "./selectors.js"
import * as data from "./getData.js"

const filldropdownContent = (countriesArr) => {
    selectors.dropdownContent.innerHTML = "";
  countriesArr.forEach((element) => {
    let initialListItem = document.createElement("a");
    initialListItem.classList.add("countryInTheList");
    initialListItem.setAttribute("id", element.code);
    initialListItem.innerText = element.name;
    selectors.dropdownContent.appendChild(initialListItem);
  });
};
const createContinentsButtons = (worldsContinents) => {
  worldsContinents.forEach((element) => {
    let initialBtn = document.createElement("button");
    initialBtn.classList.add("Continentbtn");
    initialBtn.setAttribute("id", element);
    initialBtn.innerText = element;
    initialBtn.addEventListener("click", function () {
      data.getCountriesByContinent(element).then(function (value) {
        //console.log(value[0]);
      filldropdownContent(value[0]);
      });
    });
    selectors.ContinentsbtnsBox.appendChild(initialBtn);
  });
};
createContinentsButtons(data.worldsContinents);

const seachOnClick = () => {
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

seachOnClick();
searchHitEnter();
