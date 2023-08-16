import React from 'react';
import styles from './Track.module.css';

function Track({track}) {
    return (
        <div>
            <h1 className={styles.name}>{track.name}</h1>
            <h1 className={styles.artist}>{track.artist}</h1>
            <h1 className={styles.album}>{track.album}</h1>
        </div>
    );
}

export default Track;