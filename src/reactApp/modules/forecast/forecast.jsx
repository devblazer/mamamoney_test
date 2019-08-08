import React from 'react';
import PropTypes from 'prop-types';

import styles from './forecast.scss';
import Moment from 'moment';

function Forecast({data, temperatureUnit, timeFormatString}) {
	return <section className={styles.forecast}>
		<header>Forecast</header>
		<dl>
			{data.map(row=>{
				return <React.Fragment key={row.date.format('D_H')}>
					<dt>
						{row.date.format(timeFormatString)}
					</dt>
					<dd>
						{row.temperatureString}
					</dd>
				</React.Fragment>;
			})}
		</dl>
	</section>
}

Forecast.defaultProps = {
	timeFormatString: 'D MMM, ha',
	timezoneOffset: '+0200'
};

Forecast.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.instanceOf(Moment).isRequired,
			temperatureString: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	dateFormatString: PropTypes.string,
	timezoneOffset: PropTypes.string
};

export default Forecast;