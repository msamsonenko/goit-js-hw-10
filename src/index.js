import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
//import page eleement's refs
import { pageElemenets } from './page-elements';
//import country fetch from 'https://restcountries.com/v3.1/'
import { fetchCountries } from './fetchCountries';
//import functions for rendering markup of found country(ies)
import { renderCountryMarkUp, renderListOfCountries } from './markUp';
//destructurization of the pageElements object
const { input, list, country } = pageElemenets;

const DEBOUNCE_DELAY = 300;
//add event listener on input element
input.addEventListener('input', debounce(handleUserInput, DEBOUNCE_DELAY));
//handle user input
function handleUserInput(e) {
  //assign trimmed user input to a variable
  const userInput = e.target.value.trim();
  //clearing 'ul' and 'div' elements on user input
  list.innerHTML = '';
  country.innerHTML = '';
  //show notification is input field is cleared by user and cancel unnecessary fetch request
  if (userInput === '') {
    Notiflix.Notify.info('Please enter country name');
    return;
  }
  // fetch countries according to user input
  fetchCountries(userInput)
    .then(result => {
      //skip this then if 404 status on request
      if (!result) {
        return;
      }
      //filter results according to user input
      return result.filter(res => {
        return res.name.official.toLowerCase().includes(userInput, 0);
      });
    })
    //render markup
    .then(renderList)
    //catch error
    .catch(error => {
      console.dir(error);
    });
}

//renders murkup according to request result
function renderList(countries) {
  //skip below code if 404 status returned
  if (!countries) {
    return;
  }
  //shows notification if more thaat 10 countries in array
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  //renders murkup for one country
  if (countries.length === 1) {
    return renderCountryMarkUp(countries[0]);
  }
  //renders murkup for a list of countries
  return renderListOfCountries(countries);
}
