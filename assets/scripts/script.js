const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
let ContinentsData = {};
let globalData = {};
worldsContinents.forEach((element) => {
  ContinentsData[element] = {
    countriesArr: [1],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
});
console.log(ContinentsData);

//-----------get global data from API ----------------
const GlobalData = async () => {
  try {
    const timeLIneURL =
      "https://intense-mesa-62220.herokuapp.com/https://corona-api.com/timeline";
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const data = await (await fetch(timeLIneURL)).json();
    console.log(data.data[0]);
    globalData = data.data[0];
    console.log(globalData);
  } catch (err) {
    console.log(err);
  }
  document.body.innerHTML = "DONE";
};
//------------------------- getCountryCovidData -------------------
const getCountryCovidData = async (CountryCode, isCountrySellected) => {
  try {
    const countryDataURL = `https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries/${CountryCode}`;
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const response = await fetch(countryDataURL);
    const countryData = await response.json();
    console.log(countryData.data);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countryData.status}`);
    }

    document.body.innerHTML = "DONE";
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------------
const fillcountriesData = (countriesData) => {
  let countries = [];
  countriesData.forEach((element) => {
    let eachcountry = {};
    eachcountry.name = element.name.common;
    eachcountry.code = element.cca2;
    console.log(eachcountry.code);
    getCountryCovidData(eachcountry.code, false);
    countries.push(eachcountry);
  });
  return countries;
};
//------------------------- get Countries by cotinent  -------------------
const getCountriesByContinent = async (region) => {
  try {
    const CountriesByContinentURL = `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region}`;
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const response = await fetch(CountriesByContinentURL);
    const countriesData = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countriesData.status}`);
    }
    let tempArr = fillcountriesData(countriesData);
    console.log(tempArr);
    ContinentsData[region].countriesArr.push(tempArr);
    console.log(ContinentsData[region].countriesArr);
  } catch (err) {
    console.log(err);
  }
  document.body.innerHTML = "DONE";
};

//----------call the functions --------------
//GlobalData();
//getCountriesByContinent("asia");
