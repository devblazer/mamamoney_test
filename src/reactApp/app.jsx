import React, {useState, useMemo, useEffect} from 'react';

import TemperatureUnitSwitch from './modules/temperatureUnitSwitch/temperatureUnitSwitch.jsx';
import CurrentStatus from './modules/currentStatus/currentStatus.jsx';
import Forecast from './modules/forecast/forecast.jsx';

import {defaultTemperatureUnit, temperatureUnitOptions} from './globals.js';
import WeatherApi from './data/weatherApi/weatherApi.js';
import Moment from 'moment';

// todo: location / api instance are static for now, would ideally become some kind of useState inside App component
const location = {title: 'Cape Town', lat: -33.9249, long: 18.4241};

const formatTemperature = (temp, temperatureUnitOption)=>{
	return Math.round(temp) + temperatureUnitOption.symbol;
};
const convertTemp = (temp, unitOption)=>{
	return unitOption.converter ? unitOption.converter(temp) : temp;
};
const processData = data=>{
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

export default function App() {
	const [temperatureUnit, setTemperatureUnit] = useState(defaultTemperatureUnit);
	const temperatureUnitOption = temperatureUnitOptions.get(temperatureUnit);

	const [retry, setRetry] = useState(0);

	const [apiData, setApiData] = useState(null);
	const updateApiData = data=>{
		setApiData(processData(data, temperatureUnit));
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

	const data = useMemo(()=>{
		if (!apiData)
			return null;

		let currentTemp = convertTemp(apiData.currentTemp, temperatureUnitOption);
		return {
			currentTemp,
			currentTempString: formatTemperature(currentTemp, temperatureUnitOption),

			forecast: apiData.forecast.map(row=>{
				let temperature = convertTemp(row.temperature, temperatureUnitOption);
				return {
					...row,
					temperature,
					temperatureString: formatTemperature(temperature, temperatureUnitOption)
				};
			})
		}
	}, [temperatureUnitOption, apiData]);

	return <div>
		{data ? (
			<main>
				<TemperatureUnitSwitch currentUnit={temperatureUnit} options={temperatureUnitOptions} onChange={setTemperatureUnit} />
				<CurrentStatus cityName={location.title} temperature={data.currentTempString} />
				<Forecast data={data.forecast} />
			</main>
		) : (
			<div>Loading...</div>
		)}
		<div>
			<a onClick={doApiFetch}>{retry ? 'Retry now' : 'Update'}</a>
			{retry ? (
				<span>Api call failed, retrying in {retry} seconds...</span>
			) : null}
		</div>
	</div>
};