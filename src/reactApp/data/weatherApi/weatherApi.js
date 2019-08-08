import {weatherApiSecret} from './../../globals.js';
import fetch from 'fetch-retry';
//import mockData from './weatherApi.mock.json';

const getRetryDelay = attempt=>{
	return Math.pow(2, attempt+1) * 1000;
};

const testMode = false;

export default class WeatherApi {
	#lat;
	#long;
	#secret;
	#controller = null;
	#timeout = null;

	constructor(lat, long) {
		this.#lat = lat;
		this.#long = long;
		this.#secret = weatherApiSecret;
	}

	fetch(successCallback, retryCallback) {
		/** todo: using cors-anywhere as a temp fix to get around darksky denying cors to localhost and who knows what all
		 * other environments.  Ideally we should in any case have a server running darksky requests on our behalf, to both
		 * solve the cors issue and prevent exposure of the secret to the frontend.
		 */
		const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this.#secret}/${this.#lat},${this.#long}`;

		this.abort();

		this.#controller = new AbortController();

		if (testMode) {
			console.log('api fired in test mode');
			//successCallback(mockData);
			return;
		}

		fetch(url, {
			signal: this.#controller.signal,
			cache: "no-cache",
			retries: 1000000000,
			retryDelay: attempt=>{
				let delay = getRetryDelay(attempt);
				retryCallback(delay / 1000);
				return delay;
			}
		}).then(response=>{
			return response.json();
		}).then(json=>{
			this.#controller = null;
			successCallback(json);
		});
	}

	abort() {
		if (this.#controller)
			this.#controller.abort();

		if (this.#timeout) {
			window.clearTimeout(this.#timeout);
			this.#timeout = null;
		}
	}

	delayedFetch(dur, successCallback, retryCallback) {
		this.abort();

		this.#timeout = window.setTimeout(()=>{
			this.fetch(successCallback, retryCallback);
		}, dur);
	}
}