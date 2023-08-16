import React from 'react';

const OpenPlaylist = (props) => {
    return (
        <>
            <h1>{props.playlist.name}</h1>
            {props.playlist.items.length < 1 ? (
                <p>There are no songs in this playlist</p>
            ) : (
                props.playlist.items.map((track, key) => (
                    <h1 key={key} >{track.name}</h1>
                ))
            )}
            <button onClick={props.open}>Back</button>
        </>
    );
};

export default OpenPlaylist;
