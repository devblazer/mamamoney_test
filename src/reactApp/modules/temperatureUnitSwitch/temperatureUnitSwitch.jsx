import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import styles from './temperatureUnitSwitch.scss';

function TemperatureUnitSwitch({currentUnit, options, onChange}) {
	const unitClickHandler = useCallback(e=>{
		let dataKey = e.target.dataset.key;
		if (dataKey != currentUnit)
			onChange(dataKey);
	}, [currentUnit, onChange, options]);

	// todo: probably sub this as a wrapper for a proper radio button bar style component at some point
	return <ul className={styles.temperatureUnitSwitch}>
		{[...options.values()].map(option=>{
			let dataKey = option.dataKey;
			return <li key={dataKey}>
				<a data-key={dataKey} onClick={unitClickHandler}>
					{option.title}
				</a>
			</li>
		})}
	</ul>
}

TemperatureUnitSwitch.propTypes = {
	currentUnit: PropTypes.string.isRequired,
	options: PropTypes.instanceOf(Map).isRequired,
	onChange: PropTypes.func.isRequired
};

export default TemperatureUnitSwitch;