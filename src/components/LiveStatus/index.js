import React from 'react';
import PropTypes from 'prop-types';

import styles from './LiveStatus.module.css';

// https://gbfs.citibikenyc.com/gbfs/en/station_status.json

const LiveStatus = ({
  station_id,
  num_bikes_available,
  num_ebikes_available,
  num_docks_available,
  last_reported,
  rental_url,
}) => {
  let statusInfo;
  if (!station_id) {
    statusInfo = 'none';
  } else {
    statusInfo = {
      bikes: num_bikes_available,
      electric: !num_ebikes_available ? 0 : num_ebikes_available,
      docks: num_docks_available,
    };
  }

  const formattedTime = new Date(last_reported * 1000).toLocaleTimeString(
    'en-US'
  );
  return station_id ? (
    <>
      <h3 className={styles.heading}>Live Status</h3>
      <div className={styles.stationStatus}>
        <div className={styles['station-bikes']}>
          {statusInfo.bikes}{' '}
          <span className={styles['station-status-label']}>Classic</span>
        </div>
        <div className={styles['station-electric']}>
          {statusInfo.electric}
          <span className={styles['station-status-label']}>
            <span role="img" aria-label="electric">
              ⚡
            </span>
            Electric
          </span>
        </div>
        <div className={styles['station-docks']}>
          {statusInfo.docks}
          <span className={styles['station-status-label']}>Docks</span>
        </div>
      </div>
      <p className={styles.lastUpdated}>Last updated on {formattedTime}</p>

      {/* <div>
        <a className={styles.buttonUnlock} href={rental_url}>
          Unlock a bike
        </a>
      </div> */}
    </>
  ) : (
    <div className={styles['loading']}>
      <p>No station selected.</p>
      <p>Please click on a station on the map to view the activity details.</p>
    </div>
  );
};

LiveStatus.propTypes = {};
export default LiveStatus;
