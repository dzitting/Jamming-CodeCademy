import React from "react";
import styles from "./Track.module.css";

function Track({ track, index, handleAddSong}) {
  return (
    <div id={`track-${index}`} className={styles.div}>
      <h1 className={styles.name}>{track.name}</h1>
      <h1 className={styles.artist}>{track.artist}</h1>
      <h1 className={styles.album}>{track.album}</h1>
      <button onClick={(e) => handleAddSong(e, index)}>Add to Playlist</button>
    </div>
  );
}

export default Track;
