// This page will have function that will transend the entire application

import { TIMEOUT_SEC } from './config'; // for bad internet connections

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const GET_JSON = async function (url) {
  try {
    //const res = await fetch(url);
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // first come first serve
    //'https://forkify-api.herokuapp.com/api/get?rId=47746'
    // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    //'https://forkify-api.herokuapp.com/api/search?q=pizza'
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // this is a promise
  } catch (err) {
    throw err; // pass it to the next page to render
  }
};
