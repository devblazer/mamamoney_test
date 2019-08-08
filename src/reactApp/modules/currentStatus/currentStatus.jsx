import React from 'react';
import PropTypes from 'prop-types'

import styles from './currentStatus.scss';
import {notNiceTempMax, notNiceTempMin} from "./../../globals.js";

const CurrentStatus = ({locationName, temperature, origTemp})=>{
	const notNiceTemperature = origTemp < notNiceTempMin || temperature > notNiceTempMax;

	return <section className={styles.currentStatus}>
		<header>{locationName}</header>
		<div>
			<span className={styles.currentTempLabel}>Current temperature</span>:
			<span className={styles.temperature}>{temperature}</span>
			{notNiceTemperature ?
				<span className={styles.warning}>Warning, temperature is not very nice!</span>
			: null}
		</div>
	</section>
};

CurrentStatus.propTypes = {
	locationName: PropTypes.string.isRequired,
	temperature: PropTypes.string.isRequired,
	origTemp: PropTypes.number.isRequired
};

export default CurrentStatus;