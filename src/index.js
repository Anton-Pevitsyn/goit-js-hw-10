import "./css/styles.css";
import _ from "lodash";
import API from "./js/fetchCounries";

const DEBOUNCE_DELAY = 300;
const refs = {
  countryNameInput: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};

refs.countryNameInput.addEventListener("input", _.debounce(onSearch, 300));

function onSearch(event) {
  const name = event.target.value;
  console.log(API.fetchCountries(name));
  API.fetchCountries(name).then(renderCounriList).catch();
}

function renderCounriList(countries) {
  console.log(countries);
  if (countries.length > 1) {
    const markup = countries
      .map((element) => {
        return `<li class="item"><img src="${element.flags.png}" alt="flag"  width="30">${element.name.official}</li>`;
      })
      .join("");
    refs.countryList.insertAdjacentHTML("afterbegin", markup);
  }
}
