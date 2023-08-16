import React from "react";
import styles from "./Track.module.css";

function Track({ track, checkPlaylist, isAdding, list }) {
  
  return (
    <div className={styles.div}>
      <h1 className={styles.name}>{track.name}</h1>
      <h1 className={styles.artist}>{track.artist}</h1>
      <h1 className={styles.album}>{track.album}</h1>
      <button onClick={checkPlaylist}>Add to Playlist</button>
      <div>
          {isAdding ? (
          list.map((playlist, key) => (<p key={key}>{playlist.name}</p>
          ))
      ) : (
        <></>
      )}
      </div>
    </div>
  );
  }

export default Track;
