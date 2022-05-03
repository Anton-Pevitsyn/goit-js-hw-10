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
    .then(onMarkup)
    .then(renderCounriInfo)
    .catch(onError);
}

function message(countries) {
  if (countries.length >= 6) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    Notify.info("Недостаточно данных");
  }
  return countries;
}

function onMarkup(countries) {
  return countries.map(markupContryList).join("");
}

function renderCounriInfo(markup) {
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";
  refs.countryList.innerHTML = markup;
}

function onError() {
  Notify.warning("Нет такой страны");
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";
}

function markupContryList(element, index, array) {
  console.log(array);
  if (array.length > 1 && array.length <= 6) {
    return `<li class="item"><img src="${element.flags.png}" alt="flag"  width="30">${element.name.official}</li>`;
  } else if (array.length === 1) {
    return `<h3 class="title-card"><img src="${
      element.flags.png
    }" alt="flag" width="40" />${element.name.official}</h3>
<ul>
  <li class="item-countri"><span class="argument">Capital: </span>${element.capital.join(
    ", "
  )}</li>
  <li class="item-countri"><span class="argument">Population: </span>${
    element.population
  }</li>
  <li class="item-countri"><span class="argument">Languges: </span>${Object.values(
    element.languages
  ).join(", ")}</li>
</ul>`;
  }
}
