const defaultTemperatureUnit = 'c';

const fahrenheit2Celcius = f=>{
	return (f - 32) * 5 / 9;
};

const temperatureUnitOptions = new Map([
	['c', {dataKey: 'c', symbol: '°C', title: 'Celcius', converter: fahrenheit2Celcius}],
	['f', {dataKey: 'f', symbol: '°F', title: 'Fahrenheit'}]
]);

const weatherApiSecret = '29e4a4ce0ec0068b03fe203fa81d457f';

export {
	defaultTemperatureUnit,
	temperatureUnitOptions,
	weatherApiSecret
}