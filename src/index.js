import './css/styles.css';
import debounce from 'lodash.debounce';
import { pageElemenets } from './page-elements';
import { fetchCountries } from './api-countries';

const { input, list, country } = pageElemenets;

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(handleUserInput, 300));

function handleUserInput(e) {
  console.log(e.target.value);
  fetchCountries(e.target.value)
    .then(result => {
      return result.filter(res =>{
        return res.name.common.toLowerCase().includes(e.target.value, )})
    }).then(renderList)
}

function renderList(countries){
  console.log(countries)
  if(countries.length > 10){
    alert('picets');
    return;
  }
  const markUp = countries.map(({population, flags: {svg,png}, name: {official}, languages})=>{
     return `<li class='list-item'><img src='${png}' width='40' height='20'>   ${official}</li>`
  }).join("");
  
  console.log(markUp)
   list.insertAdjacentHTML("afterbegin", markUp);
}