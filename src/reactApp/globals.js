const defaultTemperatureUnit = 'c';

const fahrenheit2Celcius = f=>{
	return (f - 32) * 5 / 9;
};

const temperatureUnitOptions = new Map([
	['c', {dataKey: 'c', symbol: '°C', title: 'Celcius', converter: fahrenheit2Celcius}],
	['f', {dataKey: 'f', symbol: '°F', title: 'Fahrenheit'}]
]);

const weatherApiSecret = 'd6f537ef7a948cad74b97e83b8353e60';

const notNiceTempMin = 59;
const notNiceTempMax = 77;

export {
	defaultTemperatureUnit,
	temperatureUnitOptions,
	weatherApiSecret,
	notNiceTempMin,
	notNiceTempMax
}