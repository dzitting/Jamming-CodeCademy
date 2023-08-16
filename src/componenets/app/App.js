import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../searchbar/SearchBar";
import Track from "../track/Track";
import Playlist from "../playlist/Playlist";
import CreateAPlaylist from "../createaplaylist/CreateAPlaylist";
import OpenPlaylist from "../openplaylist/OpenPlaylist";

function App() {
  const [tracks, setTracks] = useState([]); //state for saving tracks
  const [playlistName, setPlaylistName] = useState("");
  const data = [
    //Temp data for API call
    { name: "Missing You", artist: "Lil Something", album: "Rainy Day", id: 1 },
    { name: "Alone", artist: "Samus", album: "My Word", id: 2 },
    { name: "Alone", artist: "Melvin", album: "My Word", id: 3 },
  ];

  useEffect(() => {
    //Will all to API to retrieve and set data
    setTracks(data);
  }, []);

  const [query, setQuery] = useState(""); //State for saving the query

  const handleQueryChange = (e) => {
    //Handles the onChange for SearchBar user input
    setQuery(e.target.value); //Sets the value to whatever the user typs and saves in query state
  };

  const handleFormSubmit = (e) => {
    //Handles the submission in SearchBar of the form to filter the tracks appearing
    e.preventDefault();
    filterTracks(query); //Calls filterTracks and passes the query
  };

  const filterTracks = (query) => {
    //Uses the query to filter items with that search term
    const searchName = data.filter((track) => {
      if (
        track.name.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      )
        return track;
    });
    setTracks(searchName);
  };

  const [isCreating, setIsCreating] = useState(false);
  const [playlistLists, setPlaylistLists] = useState([]);
  const createdPlaylist = () => {
    //Creates a new playlist on submit
    setIsCreating(!isCreating);
    setPlaylistLists((prev) => [
      ...prev,
      {
        name: playlistName,
        items: playlistItems,
      },
    ]);
  };
  const createPlaylist = () => {
    //Creates a new playlist
    setPlaylistName(null);
    setIsCreating(!isCreating);
  };

  const playListNameChangeHandler = (e) => {
    //Sets the playlist name
    e.preventDefault();
    setPlaylistName(e.target.value);
  };

  const openWhichList = () => {
    //Shows options of where to add a song
    
  }

  const checkPlaylist = (e) => {
    //Adds a song to the playlist
    e.preventDefault();
    openWhichList();
    setPlaylistItems((prev) => [...prev, e.target.innerText]);
    console.log(playlistItems);
  }

  const [playlistOpen, setPlaylistOpen] = useState(false);

  const openPlaylist = (e) => {
    //Opens the playlist
    e.preventDefault();
    playlistLists.find((playlist) => {
      if (playlist.name === e.target.innerText) {
        setOpenPlayList(playlist);
      }
    })
    setPlaylistOpen(!playlistOpen);
  }

  console.log(playlistLists);

  const [playlistItems, setPlaylistItems] = useState([]);
  const [openPlayList, setOpenPlayList] = useState(null);
  if(playlistOpen) {
    return (
      <div className="App">
        <OpenPlaylist playlist={openPlayList}/>
      </div>
    )
  }
  return (
    //Returns the components into the render
    <div className="App">
      <SearchBar
        submit={handleFormSubmit}
        query={query}
        handleQueryChange={handleQueryChange}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "70%",
          float: "right",
        }}
      >
        {tracks.map((track) => (
          <Track track={track} checkPlaylist={checkPlaylist}/>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        {isCreating ? (
          <CreateAPlaylist
            playlist={playlistName}
            updatePlaylistName={playListNameChangeHandler}
            submit={createdPlaylist}
          />
        ) : (
          <Playlist
            openPlaylist={openPlaylist}
            playlist={playlistName}
            playlists={playlistLists}
            playlistItems={playlistItems}
            createPlaylist={createPlaylist}
            isCreating={isCreating}
          />
        )}
      </div>
    </div>
  );
}

export default App;
