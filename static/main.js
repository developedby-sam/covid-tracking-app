import "./style.css";
import { GetWorldData, GetCountryData } from "./components/fetch-data";
import numberWithCommas from "./components/number-formater";

let meterData = await GetWorldData();

const percentageCalculator = function (numerator, denomerator) {
  const percentage = (numerator / denomerator) * 100;
  return (Math.round(percentage * 100) / 100).toString() + " %";
};

const updateMeterData = function () {
  confirmedCases.innerHTML = numberWithCommas(meterData.confirmed);
  activeCases.innerHTML = numberWithCommas(meterData.active);
  deathCases.innerHTML = numberWithCommas(meterData.deaths);
  criticalCases.innerHTML = numberWithCommas(meterData.critical);
  recoveredCases.innerHTML = numberWithCommas(meterData.recovered);
  deathRate.innerHTML = percentageCalculator(
    meterData.deaths,
    meterData.total_cases
  );
  RecoveryRate.innerHTML = percentageCalculator(
    meterData.recovered,
    meterData.total_cases
  );
};

const initApp = function () {
  updateMeterData();
};

// Query-selectors
const confirmedCases = document.querySelector(".confirmed-cases .data");
const activeCases = document.querySelector(".active-cases .data");
const deathCases = document.querySelector(".death-cases .data");
const criticalCases = document.querySelector(".critical-cases .data");
const recoveredCases = document.querySelector(".recovered-cases .data");
const deathRate = document.querySelector(".death-rate .data");
const RecoveryRate = document.querySelector(".recovery-rate .data");
const selectCountry = document.querySelector("#country");

initApp();

// Filter meter data by country
let country = "USA";
selectCountry.addEventListener("change", async (event) => {
  country = event.target.value;
  meterData = await GetCountryData(country);

  if (meterData) {
    updateMeterData();
  }
});
