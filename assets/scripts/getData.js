export const worldsContinents = [
  "Asia",
  "Africa",
  "Europe",
  "Americas",
  "Oceania",
];
export let ContinentsData = {};
export let globalData = {};
worldsContinents.forEach((element) => {
  ContinentsData[element] = {
    countriesArr: [],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  };
});
export let sellectedCountry = {};

//-----------get global data from API ----------------
export const GlobalData = async () => {
  try {
    const timeLIneURL =
      "https://intense-mesa-62220.herokuapp.com/https://corona-api.com/timeline";
    const data = await (await fetch(timeLIneURL)).json();
    globalData = data.data[0];
    console.log(globalData);
  } catch (err) {
    console.log(err);
  }
};

//countryObj={code,name,confirmed,critical,deaths,recovered,calculations{deathrate,recoveryRate},casesPerMillion}
export const fillCountryCovidData = (countryData) => {
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
    const countryDataURL = `https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries/${CountryCode}`;
    const response = await fetch(countryDataURL);
    const countryData = await response.json();
    console.log(countryData);
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
      throw new Error(`HTTP error! status: ${countryData.status}`);
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
    eachcountry.confirmed = getCountryCovidData(
      eachcountry.code,
      false,
      continent
    );
    countries.push(eachcountry);
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
//GlobalData()
getCountryCovidData("FR", true, "");
