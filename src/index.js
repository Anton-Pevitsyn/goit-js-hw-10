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
  API.fetchCountries(name).then(renderCounriList).catch(onError);
}

function renderCounriList(countries) {
  // console.log(countries);
  if (countries.length > 1 && countries.length < 6) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    const markup = countries
      .map((element) => {
        return `<li class="item"><img src="${element.flags.png}" alt="flag"  width="30">${element.name.official}</li>`;
      })
      .join("");
    refs.countryList.insertAdjacentHTML("afterbegin", markup);
  } else if (countries.length === 1) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    const markupDiv = `<h3 class="title-card"><img src="${
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
    refs.countryInfo.insertAdjacentHTML("afterbegin", markupDiv);
  } else if (countries.length >= 6) {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    Notify.info("Недостаточно данных");
  }
}

function onError() {
  alert("dsfsdfsf");
  Notify.warning("Нет такой страны");
}
