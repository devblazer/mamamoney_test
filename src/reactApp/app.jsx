import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';

import TemperatureUnitSwitch from './modules/temperatureUnitSwitch/temperatureUnitSwitch.jsx';
import CurrentStatus from './modules/currentStatus/currentStatus.jsx';
import Forecast from './modules/forecast/forecast.jsx';

import {defaultTemperatureUnit, temperatureUnitOptions} from './globals.js';
import styles from './app.scss';

const formatTemperature = (temp, temperatureUnitOption)=>{
	return Math.round(temp) + temperatureUnitOption.symbol;
};
const convertTemp = (temp, unitOption)=>{
	return unitOption.converter ? unitOption.converter(temp) : temp;
};

const App = ({apiData, onUpdateClicked, retry, locationName})=>{
	const [temperatureUnit, setTemperatureUnit] = useState(defaultTemperatureUnit);
	const temperatureUnitOption = temperatureUnitOptions.get(temperatureUnit);

	// pre-process and remember app data whenever temperature unit or api data changes
	const data = useMemo(()=>{
		if (!apiData)
			return null;

		let currentTemp = convertTemp(apiData.currentTemp, temperatureUnitOption);

		return {
			currentTemp,
			origTemp: apiData.currentTemp,
			currentTempString: formatTemperature(currentTemp, temperatureUnitOption),

			forecast: apiData.forecast.slice(1).map(row=>{
				let temperature = convertTemp(row.temperature, temperatureUnitOption);
				return {
					...row,
					temperature,
					temperatureString: formatTemperature(temperature, temperatureUnitOption)
				};
			})
		}
	}, [temperatureUnitOption, apiData, onUpdateClicked]);

	return <div>
		{data ? (
			<main className={styles.app}>
				<header>
					<TemperatureUnitSwitch currentUnit={temperatureUnit} options={temperatureUnitOptions} onChange={setTemperatureUnit} />
					<a className={styles.updateBtn} onClick={onUpdateClicked}>{retry ? 'Retry now' : 'Update'}</a>
					{retry ? (
						<span className={styles.retryError}>Api call failed, retrying in {retry} seconds...</span>
					) : null}
				</header>
				<CurrentStatus locationName={locationName} temperature={data.currentTempString} origTemp={data.origTemp} />
				<Forecast data={data.forecast} />
			</main>
		) : (
			<div>Loading...</div>
		)}
	</div>
};

App.propTypes = {
	apiData: PropTypes.object,
	onUpdateClicked: PropTypes.func.isRequired,
	retry: PropTypes.number.isRequired,
	locationName: PropTypes.string.isRequired
};

export default App;
