import React from 'react';
import styles from './CreateAPlaylist.module.css';

function CreateAPlaylist(props) {
    return (
        <div>
            <h1>Create A Playlist</h1>
            <form onSubmit={props.submit}>
                <input onChange={props.updateName} type="text" placeholder="Playlist Name" value={props.playlistName}/>
                <button className={styles.button} type="submit">Create</button>
                <button className={styles.button} onClick={props.isCreating} type="button">Back</button>
            </form>
        </div>
    );
}

export default CreateAPlaylist;