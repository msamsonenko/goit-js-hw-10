import './css/styles.css';
import debounce from 'lodash.debounce';
import { pageElemenets } from './page-elements';
import { fetchCountries } from './api-countries';

const { input, list, country } = pageElemenets;
// console.log(API);

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(handleUserInput, 300));

function handleUserInput(e) {
  console.log(e.target.value);
  fetchCountries(e.target.value)
    .then(result => {
      return result.filter(res => {
        console.log(res.capital[0]);
        return res.capital[0].toLowerCase().includes(e.target.value);
      });
    })
    .then(console.log);
}

// function renderList(countries) {
//   console.log(input.value);

//   const arr = countries.filter(country => {
//     console.log(country.capital[0]);
//     console.log(country.capital[0].includes(input.value));
//   });
//   return arr;
// }

// console.log(input.value);
// console.log(country.capital[0][0]);
// if () {
//   const liItem = document.createElement('li');
//   liItem.textContent = country.capital;
//   list.appendChild(liItem);
// }

// countries.map(country => {
//   console.log(country);
//   const liItem = document.createElement('li');
//   liItem.textContent = country.capital;
//   list.appendChild(liItem);
// });
