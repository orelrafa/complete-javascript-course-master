'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
IMPORTANT: API URL Change

The base URL of the API used throughout this section has changed

It's not a big deal, it's really just one small change. Instead of:

https://restcountries.eu/rest/v2/

It's now:

https://countries-api-836d.onrender.com/countries/
*/
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  const url = `https://restcountries.com/v3.1/name/${country}`;
  //console.log(url);
  request.open('GET', url);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //console.log(data);
    //console.log(data.languages.por);
    //console.log(data.languages[Object.keys(data.languages)[0]]);

    //getting the nested currency name abstractly
    //console.log(data.currencies.EUR.name);
    let currencyName = data.currencies[Object.keys(data.currencies)[0]];
    //console.log(currencyName[Object.keys(currencyName)[0]]);
    //console.log([data]);
    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span>${
        currencyName[Object.keys(currencyName)[0]]
      }</p>
    </div>
  </article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
  });
  countriesContainer.style.opacity = 1;
};

/*
getCountryData('japan');
getCountryData('usa');
getCountryData('russia');
*/
//Note that the API has dynamically assigned currency names and languages, requires functions that would iterate and index the properties to get the value for any country. Just a sidenote if you want to use it in the future.

/*
setTimeout(() => {
  console.log('1 second has passed');
  setTimeout(() => {
    console.log('2 seconds have passed');
    setTimeout(() => {
      console.log('3 seconds have passed');
    }, 1000);
  }, 1000);
}, 4000);
*/

//setTimeout adds a delay before a function call
/*
const startTime = new Date();

setTimeout(function () {
  console.log('time passed is ' + (new Date() - startTime) + ' ms');
}, 500);
while (new Date() - startTime < 5000) {}
*/
//solution to callback hell is promises

//the promise has 3 states, Pending, settled (fullfilled/rejected). The fetch API builds us a promise for us to consume.

/*
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);
*/
const renderCountry = function (data) {
  let currencyName = data.currencies[Object.keys(data.currencies)[0]];
  const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span>${
        currencyName[Object.keys(currencyName)[0]]
      }</p>
    </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryDataV2 = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      console.log(neighbor);
      //Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryDataV2('china');

//promise chaining
