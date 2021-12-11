export const worldsContinents = [
  "Asia",
  "Africa",
  "Europe",
  "Americas",
  "Oceania",
];
export let ContinentsData = {};
let LastWeeKglobalData = {};
let currentGlobalData = {};
worldsContinents.forEach((element) => {
  ContinentsData[element] = {
    countriesArr: [],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
});
export let sellectedCountry = {};
const chartDays = 7;

//-----------get global data from API ----------------
export const fillGlobalData = (globalData) => {
  let NewDeaths = [];
  let date = [];
  let NewConfrimed = [];

  for (let i = 0; i < chartDays; i++) {
    NewDeaths.push(globalData[i].new_deaths);
    NewConfrimed.push(globalData[i].new_confirmed);
    date.push(globalData[i].date);
  }
  let obj = {
    NewDeaths: NewDeaths.reverse(),
    NewConfrimed: NewConfrimed.reverse(),
    date: date.reverse(),
  };

  currentGlobalData["active"] = globalData[0].active;
  currentGlobalData["deaths"] = globalData[0].deaths;

  return obj;
};
export const getGlobalData = async () => {
  try {
    const timeLIneURL =
      "https://intense-mesa-62220.herokuapp.com/https://corona-api.com/timeline";
    const data = await (await fetch(timeLIneURL)).json();
    LastWeeKglobalData = fillGlobalData(data.data);
    return LastWeeKglobalData;
  } catch (err) {
    console.log(err);
  }
};

//countryObj={code,name,confirmed,critical,deaths,recovered,calculations{deathrate,recoveryRate},casesPerMillion}
export const fillCountryCovidData = (countryData) => {
  let CountryObj = {};

  CountryObj.code = countryData.data.code;
  CountryObj.name = countryData.data.name;
  CountryObj.confirmed = countryData.data.latest_data.confirmed;
  //CountryObj.critical = countryData.data.latest_data.critical;
  CountryObj.deaths = countryData.data.latest_data.deaths;
  CountryObj.recovered = countryData.data.latest_data.recovered;
  //get callculated data
  CountryObj["death Rate"] = countryData.data.latest_data.calculated.death_rate.toFixed();
  CountryObj["recovery Rate"] =
    countryData.data.latest_data.calculated.recovery_rate.toFixed(2);
    CountryObj["cases/Million"] =
    countryData.data.latest_data.calculated.cases_per_million_population;
  

  return CountryObj;
};
//---------------------- calculate content sum (death/comfirmed case / recovered)

export const calculateContinentCovidData = (countryCovidData, continent) => {
  ContinentsData[continent].confirmed += countryCovidData.confirmed;
  ContinentsData[continent].deaths += countryCovidData.deaths;
  ContinentsData[continent].recovered += countryCovidData.recovered;
  return countryCovidData.confirmed;
};
//------------------------- getCountryCovidData -------------------
export const getCountryCovidData = async (
  CountryCode,
  isCountrySellected,
  continent
) => {
  try {
    if(CountryCode==="XK") return""
    const countryDataURL = `https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries/${CountryCode}`;
    const response = await fetch(countryDataURL);
    const countryData = await response.json();
    //console.log(countryData.data.latest_data);

    if (isCountrySellected) {
      sellectedCountry = fillCountryCovidData(countryData);
      return sellectedCountry;
    } else {
      return calculateContinentCovidData(
        countryData.data.latest_data,
        continent
      );
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countryData.status} ,country :${CountryCode}`);
    }
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------------
export const fillcountriesData = (countriesData, continent) => {
  let countries = [];
  countriesData.forEach((element) => {
    let eachcountry = {};
    eachcountry.name = element.name.common;
    eachcountry.code = element.cca2;
    let tempVar = 0;
    getCountryCovidData(eachcountry.code, false, continent).then(function (value) {
      eachcountry.confirmed = value;
      countries.push(eachcountry);
    });
    
    
  });
  return countries;
};
//------------------------- get Countries by cotinent  -------------------
export const getCountriesByContinent = async (continent) => {
  try {
    const CountriesByContinentURL = `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${continent}`;
    const response = await fetch(CountriesByContinentURL);
    const countriesData = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countriesData.status}`);
    }
    let tempArr = fillcountriesData(countriesData, continent);
    ContinentsData[continent].countriesArr.push(tempArr);
    return ContinentsData[continent].countriesArr;
  } catch (err) {
    console.log(err);
  }
};
//------------------ search Country manually -----------------------

export const searchCountry = async (country) => {
  try {
    const CountriesByContinentURL = `https://intense-mesa-62220.herokuapp.com/https://restcountries.com/v3.1/name/${country}`;
    const response = await fetch(CountriesByContinentURL);
    const countryData = await response.json();
    return getCountryCovidData(
      countryData[0].cca2,
      true,
      countryData[0].region
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${countryData.status}`);
    }
  } catch (err) {
    console.error("not found");
  }
};
//----------call the functions --------------
//TODO : get data for all containent
