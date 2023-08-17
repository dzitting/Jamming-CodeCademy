import React from 'react';

function OpenPlaylist(props) {
  console.log(props.playlist);
    if (!props.playlist || !props.playlist.items) {
      // Playlist data is not yet available, show loading state
      return <p>Loading...</p>;
    }
  
    return (
      <>
        <h1>{props.playlist.name}</h1>
        {props.playlist.items.length < 1 ? (
          <p>There are no songs in this playlist</p>
        ) : (
          props.playlist.items.map((track) => (
            <p>{track.name} by {track.artist} from {track.album}</p>
          ))
        )}
        <button onClick={props.open}>Back</button>
      </>
    );
  };
  
export default OpenPlaylist;
