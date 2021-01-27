import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ranking.module.css';

const Ranking = ({ station }) => {
    if (!station) {
        return null;
    }
    const { rank, stations_in_nta, nta_name } = station;
    return (
        <>
            <span className={styles['rank-title']}>Popularity Ranking</span>
            <span className={styles['rank-text']}>
                {rank} of {stations_in_nta} in {nta_name}
            </span>
        </>
    );
};

Ranking.propTypes = {
    station: PropTypes.object,
};

export default Ranking;
