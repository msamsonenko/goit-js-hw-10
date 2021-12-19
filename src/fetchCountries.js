import Notiflix from 'notiflix';
//fields constant for customizing request
const FIELDS = '?fields=name,capital,population,flags,languages';
//fetch countries according to user input
export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}${FIELDS}`).then(response => {
    //if status 200 return response
    if (response.status === 200) {
      return response.json();
    }
    //if status 404 return notification about error
    if (response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    }
  });
}
