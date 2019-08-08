import React, {useEffect, useMemo, useState} from 'react';
import Moment from 'moment';
import WeatherApi from './../data/weatherApi/weatherApi.js';

// todo: location / api instance are static for now, would ideally become some kind of useState inside App component
const location = {title: 'Cape Town', lat: -33.9249, long: 18.4241};

const processResponse = data=>{
	return {
		currentTemp: data.currently.temperature,
		forecast: data.hourly.data.map(row=>{
			return {
				date: Moment.unix(row.time).utcOffset('+0200'),
				temperature: row.temperature
			};
		})
	};
};

// uses the api class to make api calls and decide when such calls need to be made, passing a subset of the results to the App
const ApiWrapper = ({App})=>{
	const [retry, setRetry] = useState(0);

	const [apiData, setApiData] = useState(null);
	const updateApiData = data=>{
		setApiData(processResponse(data));
		setRetry(0);
		api.delayedFetch(1200000, updateApiData, setRetry);
	};

	const api = useMemo(()=>{
		return new WeatherApi(location.lat, location.long);
	}, []);

	const doApiFetch = ()=>{
		api.fetch(updateApiData, setRetry);
	};

	useEffect(() => {
		doApiFetch();

		return ()=>{
			api.abort();
		};
	}, []);

	return <App apiData={apiData} onUpdateClicked={doApiFetch} retry={retry} locationName={location.title} />
};

export default ApiWrapper;