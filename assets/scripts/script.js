const worldsContinents = ["Asia", "Africa", "Europe", "Americas", "Oceania"];
let ContinentsData = {};
let globalData = {};
worldsContinents.forEach((element) => {
  ContinentsData[element] = {
    countriesArr: [],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
});
let sellectedCountry = {};
console.log(ContinentsData);

//-----------get global data from API ----------------
const GlobalData = async () => {
  try {
    const timeLIneURL =
      "https://intense-mesa-62220.herokuapp.com/https://corona-api.com/timeline";
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const data = await (await fetch(timeLIneURL)).json();
    globalData = data.data[0];
  } catch (err) {
    console.log(err);
  }
  document.body.innerHTML = "DONE";
};

//countryObj={code,name,confirmed,critical,deaths,recovered,calculations{deathrate,recoveryRate},casesPerMillion}
const fillCountryCovidData = (countryData) => {
  let CountryObj = {};
  let CountryCalcObj = {};
  CountryObj.code = countryData.data.code;
  CountryObj.name = countryData.data.name;
  CountryObj.confirmed = countryData.data.latest_data.confirmed;
  CountryObj.critical = countryData.data.latest_data.critical;
  CountryObj.deaths = countryData.data.latest_data.deaths;
  CountryObj.recovered = countryData.data.latest_data.recovered;
  //get callculated data
  CountryCalcObj.deathRate = countryData.data.latest_data.calculated.death_rate;
  CountryCalcObj.recoveryRate =
    countryData.data.latest_data.calculated.recovery_rate;
  CountryCalcObj.casesPerMillion =
    countryData.data.latest_data.calculated.cases_per_million_population;
  CountryObj.calcuations = CountryCalcObj;

  return CountryObj;
};
//---------------------- calculate content sum (death/comfirmed case / recovered)

const calculateContinentCovidData = (countryCovidData, continent) => {
  ContinentsData[continent].confirmed += countryCovidData.confirmed;
  ContinentsData[continent].deaths += countryCovidData.deaths;
  ContinentsData[continent].recovered += countryCovidData.recovered;
};
//------------------------- getCountryCovidData -------------------
const getCountryCovidData = async (
  CountryCode,
  isCountrySellected,
  continent
) => {
  try {
    const countryDataURL = `https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries/${CountryCode}`;
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const response = await fetch(countryDataURL);
    const countryData = await response.json();
    //console.log(countryData.data.latest_data);

    if (isCountrySellected) {
      sellectedCountry = fillCountryCovidData(countryData);
    } else {
      calculateContinentCovidData(countryData.data.latest_data, continent);
    }
    console.log(sellectedCountry);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countryData.status}`);
    }

    document.body.innerHTML = "DONE";
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------------
const fillcountriesData = (countriesData, continent) => {
  let countries = [];

  countriesData.forEach((element) => {
    let eachcountry = {};
    eachcountry.name = element.name.common;
    eachcountry.code = element.cca2;
    getCountryCovidData(eachcountry.code, false, continent);
    countries.push(eachcountry);
  });
  return countries;
};
//------------------------- get Countries by cotinent  -------------------
const getCountriesByContinent = async (continent) => {
  try {
    const CountriesByContinentURL = `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${continent}`;
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const response = await fetch(CountriesByContinentURL);
    const countriesData = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countriesData.status}`);
    }
    let tempArr = fillcountriesData(countriesData, continent);
    ContinentsData[continent].countriesArr.push(tempArr);
  } catch (err) {
    console.log(err);
  }
  document.body.innerHTML = "DONE";
};
//------------------ search Country manually -----------------------

const searchCountry = async (country) => {
  try {
    const CountriesByContinentURL = `https://intense-mesa-62220.herokuapp.com/https://restcountries.com/v3.1/name/${country}`;
    document.body.innerHTML = "LOADDING ......⏰⏰⏰⌚";
    const response = await fetch(CountriesByContinentURL);
    const countryData = await response.json();
    
    //console.log(countryData[0]);
    getCountryCovidData(countryData[0].cca2,true,countryData[0].region);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countryData.status}`);
    }
  } catch (err) {
    console.log(err);
  }
  document.body.innerHTML = "DONE";
};
//----------call the functions --------------
//GlobalData();
//getCountriesByContinent("Asia");
//TODO : get data for all containent
//getCountryCovidData("SA",true,"Asia")
//console.log(ContinentsData);
searchCountry("France")
