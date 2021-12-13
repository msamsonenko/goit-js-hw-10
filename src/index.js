import './css/styles.css';
import { pageElemenets } from './page-elements';
import { fetchCountries } from './api-countries';

const { input, list, country } = pageElemenets;

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', handleUserInput);

function handleUserInput(e) {
  fetchCountries('ukraine');
}
