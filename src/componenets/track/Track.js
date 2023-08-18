import React from "react";
import styles from "./Track.module.css";

function Track({ track, index, handleAddSong }) {
  return (
    <div id={`track-${index}`} className={styles.div}>
      <h1 className={styles.name}>{track.track_name}</h1>
      <h1 className={styles.artist}>{track.artist}</h1>
      <h1 className={styles.album}>{track.album}</h1>
      <button
        className={styles.button}
        onClick={(e) => handleAddSong(e, index)}
      >
        <img
          src="https://img.icons8.com/?size=512&id=40097&format=png"
          style={{ width: 20, height: 20 }}
        />
      </button>
    </div>
  );
}

export default Track;
