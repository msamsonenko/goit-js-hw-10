import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { pageElemenets } from './page-elements';
import { fetchCountries } from './api-countries';

const { input, list, country } = pageElemenets;

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(handleUserInput, DEBOUNCE_DELAY));

function handleUserInput(e) {
  list.innerHTML = '';
  country.innerHTML = '';

  console.log(e.target.value);
  if (e.target.value === '') {
    Notiflix.Notify.info('Please enter country name');
  }
  fetchCountries(e.target.value)
    .then(result => {
      return result.filter(res => {
        return res.name.common.toLowerCase().includes(e.target.value);
      });
    })
    .then(renderList)
    .catch(error => {
      console.dir(error);
    });
}

function renderList(countries) {
  console.log(countries);
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
                <img src='${png}' width='40' height='30'>   
                <p>${common}</p>
                <ul>
                  <li><span>Capital:</span><span>${capital[0]}</span></li>
                  <li><span>Population:</span><span>${population}</span></li>
                  <li><span>Languages:</span><span>${Object.values(languages)}</span></li>
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
