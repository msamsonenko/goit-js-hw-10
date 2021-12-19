import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { pageElemenets } from './page-elements';
import { fetchCountries } from './api-countries';

const { input, list, country } = pageElemenets;

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(handleUserInput, DEBOUNCE_DELAY));

function handleUserInput(e) {
  const userInput = e.target.value;
  list.innerHTML = '';
  country.innerHTML = '';

  console.log(e.target.value.trim().length);
  if (userInput === '') {
    Notiflix.Notify.info('Please enter country name');
    return;
  }
  fetchCountries(userInput)
    .then(result => {
      return result.filter(res => {
        return res.name.common.toLowerCase().includes(userInput.trim());
      });
    })
    .then(renderList)
    .catch(error => {
      console.dir(error);
    });
}

function renderList(countries) {
  console.log(countries);
  if (countries.length === 0) {
    return Notiflix.Notify.failure('no countries found');
  }
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found!');
    return;
  }
  if (countries.length === 1) {
    console.log(countries[0]);
    return renderCountryMarkUp(countries[0]);
  }
  return renderListOfCountries(countries);
}

function renderCountryMarkUp(countries) {
  const {
    population,
    flags: { png },
    name: { common },
    languages,
    capital,
  } = countries;
  const markUp = `
                <div class="country-info__header">
                  <img src='${png}' width='40' height='30'>   
                  <p class="country-name">${common}</p>
                </div>
                <ul class="country-details">
                  <li><span>Capital:</span>${capital[0]}</li>
                  <li><span>Population:</span>${population}</li>
                  <li><span>Languages:</span>${Object.values(languages)}</li>
                </ul>
              `;

  console.log(markUp);
  return country.insertAdjacentHTML('afterbegin', markUp);
}
function renderListOfCountries(countries) {
  const markUp = countries
    .map(({ flags: { png }, name: { common } }) => {
      return `<li class='list-item'><img src='${png}' width='40' height='25'>   ${common}</li>`;
    })
    .join('');

  console.log(markUp);
  list.insertAdjacentHTML('afterbegin', markUp);
}
