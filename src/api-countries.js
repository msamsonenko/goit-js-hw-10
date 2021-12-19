import Notiflix from 'notiflix';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    console.log(response.status);
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 404) {
      Notiflix.Notify.failure('No such country, please enter a valid name');
      console.log(response.status);
    }
  });
}
