import React from 'react';
import PropTypes from 'prop-types'

import styles from './currentStatus.scss';

const CurrentStatus = ({locationName, temperature})=>{
	return <section className={styles.currentStatus}>
		<header>{locationName}</header>
		<div>
			<span className={styles.currentTempLabel}>Current temperature</span>:
			<span className={styles.temperature}>{temperature}</span>
		</div>
	</section>
};

CurrentStatus.propTypes = {
	locationName: PropTypes.string.isRequired,
	temperature: PropTypes.string.isRequired
};

export default CurrentStatus;