export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies`).then(
    response => console.log(response.json()),
  );
}

export function getAllCountries() {}
