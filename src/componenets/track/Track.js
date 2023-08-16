import React from 'react';
import styles from './Track.module.css';

function Track({track, checkPlaylist}) {
    return (
        <div>
            <h1 className={styles.name}>{track.name}</h1>
            <h1 className={styles.artist}>{track.artist}</h1>
            <h1 className={styles.album}>{track.album}</h1>
            <button onClick={checkPlaylist}>Add to Playlist</button>
        </div>
    );
}

export default Track;