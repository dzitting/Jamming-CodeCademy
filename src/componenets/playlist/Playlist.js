import React from "react";
import styles from "./Playlist.module.css";

function Playlist(props) {
  return (
    <>
      <h1 className={styles.title}>Playlists</h1>
      {props.playlists.length < 1 ? (
        <p>There are no Playlists yet</p>
      ) : (
        props.playlists.map((playlist, key) => (
          <h2 onClick={props.openPlaylist} className={styles.playlist} key={key}>{playlist.name}</h2>
        ))
      )}

      <button className={styles.button} onClick={props.createPlaylist}>Create Playlist</button>
    </>
  );
}

export default Playlist;
