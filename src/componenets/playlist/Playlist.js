import React from "react";
import styles from "./Playlist.module.css";

function Playlist(props) {
  return (
    <>
      <h1 className={styles.title} style={{boxShadow: "0px 2px 2px black"}}>Playlists</h1>
      <button className={styles.button} onClick={props.createPlaylist}>Create Playlist</button>
      {props.playlists.length < 1 ? (
        <p>There are no Playlists yet</p>
      ) : (
        props.playlists.map((playlist, key) => (
          <h2 id={`list-${key}`} onClick={props.openPlaylist} className={styles.playlist} key={key}>{playlist.name}</h2>
        ))
      )}

    </>
  );
}

export default Playlist;
