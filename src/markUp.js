import { pageElemenets } from './page-elements';
const { list, country } = pageElemenets;
//renders murkup for one country
export function renderCountryMarkUp(countries) {
  const {
    population,
    flags: { png },
    name: { official },
    languages,
    capital,
  } = countries;
  const markUp = `
                <div class="country-info__header">
                  <img src='${png}' width='40' height='30'>   
                  <p class="country-name">${official}</p>
                </div>
                <ul class="country-details">
                  <li><span>Capital:</span>${capital[0]}</li>
                  <li><span>Population:</span>${population}</li>
                  <li><span>Languages:</span>${Object.values(languages)}</li>
                </ul>
              `;

  return country.insertAdjacentHTML('afterbegin', markUp);
}
//renders murkup for a list of countries
export function renderListOfCountries(countries) {
  const markUp = countries
    .map(({ flags: { png }, name: { common } }) => {
      return `<li class='list-item'><img src='${png}' width='40' height='25'>${common}</li>`;
    })
    .join('');
  list.insertAdjacentHTML('afterbegin', markUp);
}
