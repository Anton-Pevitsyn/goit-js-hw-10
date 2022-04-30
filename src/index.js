import "./css/styles.css";
import _ from "lodash";
import API from "./js/fetchCounries";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const DEBOUNCE_DELAY = 300;
const refs = {
  countryNameInput: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};

refs.countryNameInput.addEventListener("input", _.debounce(onSearch, 300));

function onSearch(event) {
  const name = event.target.value;
  API.fetchCountries(name)
    .then(message)
    .then(renderCounriList)
    .then(renderCounriInfo)
    .catch(onError);
}

function message(countries) {
  if (countries.length >= 6) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    return Notify.info("Недостаточно данных");
  }
  return countries;
}

function renderCounriList(countries) {
  // console.log(countries);
  if (countries.length > 1 && countries.length < 6) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    const markup = countries.map(markupContryList).join("");
    refs.countryList.insertAdjacentHTML("afterbegin", markup);
    return;
  }
  return countries;
}

function renderCounriInfo(country) {
  if (country.length === 1) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    refs.countryInfo.insertAdjacentHTML(
      "afterbegin",
      markupCountryInfo(country)
    );
    return;
  }
  return country;
}

function onError() {
  Notify.warning("Нет такой страны");
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";
}

function markupContryList(element) {
  return `<li class="item"><img src="${element.flags.png}" alt="flag"  width="30">${element.name.official}</li>`;
}

function markupCountryInfo(countries) {
  return `<h3 class="title-card"><img src="${
    countries[0].flags.png
  }" alt="flag" width="40" />${countries[0].name.official}</h3>
<ul>
  <li class="item-countri"><span class="argument">Capital: </span>${countries[0].capital.join(
    ", "
  )}</li>
  <li class="item-countri"><span class="argument">Population: </span>${
    countries[0].population
  }</li>
  <li class="item-countri"><span class="argument">Languges: </span>${Object.values(
    countries[0].languages
  ).join(", ")}</li>
</ul>`;
}
