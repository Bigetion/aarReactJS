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
    'Content-Type': 'application/json'
  };

  if (localStorage.jwt) {
    opt.headers = Object.assign(opt.headers, {
      Authorization: 'Bearer ' + localStorage.jwt
    })
  }

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