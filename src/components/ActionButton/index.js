import React from 'react';
import styles from './ActionButton.module.css';
const ActionButton = ({ href }) => {
    return (
        <a className={styles['button']} href={href}>
      Unlock Citi Bike
        </a>
    );
};

export default ActionButton;
