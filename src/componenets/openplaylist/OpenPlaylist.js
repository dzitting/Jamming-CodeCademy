import React from "react";

function OpenPlaylist(props) {
  console.log(props.playlist);
  if (!props.playlist || !props.playlist.items) {
    // Playlist data is not yet available, show loading state
    return <p>Loading...</p>;
  }

  const cardStyle = {
    backgroundColor: "darksalmon",
    padding: 5,
    textAlign: "center",
    width: "calc(100vh / 4)",
    margin: "10px 1%",
    borderRadius: 12,
    height: "calc(100vh / 6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
    {props.editingName ? (
      <form onSubmit={props.confirmUpdate}>
        <input onChange={props.updatingNameEdit} style={{transform: 'translateX(320%)'}} value={props.playlist.name}/>
      </form>
    ): (
      <h1 style={{ textAlign: "center" }}>{props.playlist.name}</h1>
    )}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          maxWidth: "90vw",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          margin: "0 auto",
          height: "max-content",
        }}
      >
        {props.playlist.items.length < 1 ? (
          <p style={{ textAlign: "center", width: "100%" }}>There are no songs in this playlist</p>
        ) : (
          props.playlist.items.map((track) => (
            <div style={cardStyle}>
              <p>
                {track.name} by {track.artist} from {track.album}
              </p>
            </div>
          ))
        )}
      </div>
      <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <button
          style={{ margin: "0 10px" }}
          onClick={props.open}
        >
          Back
        </button>
        <button onClick={props.changePlaylistName}
        >
          Edit Name
        </button>
      </div>
    </>
  );
}

export default OpenPlaylist;
