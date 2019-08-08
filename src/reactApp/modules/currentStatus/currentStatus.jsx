import React from 'react';
import PropTypes from 'prop-types'

import styles from './currentStatus.scss';

function CurrentStatus({cityName, temperature}) {
	return <section className={styles.currentStatus}>
		<header>{cityName}</header>
		<div>
			<span className={styles.currentTempLabel}>Current temperature</span>:
			<span className={styles.temperatureNumber}>{temperature}</span>
		</div>
	</section>
}

CurrentStatus.propTypes = {
	cityName: PropTypes.string.isRequired,
	temperature: PropTypes.number.isRequired
};

export default CurrentStatus;