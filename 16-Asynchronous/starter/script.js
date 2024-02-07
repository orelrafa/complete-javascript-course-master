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
  //countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

const getJSON = async function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};
/*
const getCountryDataV2 = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      console.log(neighbor);
      //Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err} oh nyo!`);
      renderError(`Something went wong. ${err.message} Twy again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/
const getCountryDataV2 = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'No country found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) {
        throw new Error('No neighbors found!');
      }
      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'No country found'
      );
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err}`);
      renderError(`${err.message} Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryDataV2('japan');
});

getCountryDataV2('usa');

console.log('Test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve('You WIN!');
  } else {
    reject('You lost your money');
  }
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
console.log('good demonstration of the microstack priority');

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (
    resolve
  ) /*We don't need the reject function because it is impossible for the timer to fail */ {
    setTimeout(resolve, seconds * 1000);
  });
};
/*
wait(1)
  .then(() => {
    console.log('I waited for 1 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(2);
  })
  .then(() => {
    console.log('I waited for 3 seconds');
    return wait(3);
  })
  .then(() => {
    console.log('I waited for 4 seconds');
    return wait(4);
  })
  .then(() => {
    console.log('I waited for 5 seconds');
    return wait(5);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

*/

// navigator.geolocation.getCurrentPosition;

const x = 8;
