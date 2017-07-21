import 'whatwg-fetch';
// import {browserHistory} from 'react-router';
// import {NotificationManager} from 'react-notifications';


/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const opt = Object.assign(options);
  opt.headers = {
    Authorization: 'Bearer dkIYaHRQXUFoY2Agbi8eLTxEZBEzJj1wQgdXShloDW8kNl1mHGlCXHxORV1VWHRFDw0ydx0KOUoMECw+dQEgXxAPbmszdQoeGDRRNxQTIFEjdU8vWBU+DidmS2ceEkt0bB0MN1wkLnxpXi0xfmVLFnMbQTULFSgcMFQZRTcUF2BXQDZ8YQJvSgs7IiRvMUJsKldMdUxxCFsCEwU4LlpQaXthFFM1DHN7Xi0aBjgCGBI2d0MicB8+eiQxQ2glGh8QMBBIOANvShFEUBJWNg4wa1gSA1BcKVJEcGREDFRXDHkKPUM8O1VwZAIBc3J4XEYLECwfYRY2egQ3STxsExcPBzoTOwsAKDJbQS45EBUPWGdRUFZLKHJvJmQKNUgvPR9CAiY4PwV+eRM+DW4INkhMR1p0ZgFPPRoXRjMhAHMJYG9+cFEDDlx9EQADGG8aXWREa3xcJTkOdyIxOBtbEh4sSBRIK2N+fDMPa1ZbciIDLkA5WWtkAjxcYy8XDnkBLStyBA0pQFxVEW8cFi1bczlgNA0ENyZgLiBQXDt4KkhVeQkpDUs1VDElJ1M4HUU+TkZ6XjlCdhRASAwTT2w9O2sGVTgXO2cBVWBLVV1sfU55PnFaPSwhaXJ1EQgPAk9GZHwOaRxhBXJeDgZjW3sfLFwZFzhYb2Z+KQ==',
    'Content-Type': 'application/json'
  };

  return fetch(url, opt)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      const err = error;
      err.message = error.response.headers.get('x-error-detail') || error.message;

      if (err.response.status === 401) {
        // NotificationManager.error(err.message, err.response.body, 2000);
        // browserHistory.push('/login');
      }

      if (error.response.status === 403) {
        // NotificationManager.error(err.message, err.response.body, 2000);
        // browserHistory.push('/');
      }

      throw err;
    });
}