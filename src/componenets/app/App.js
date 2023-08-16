import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../searchbar/SearchBar";
import Track from "../track/Track";
import Playlist from "../playlist/Playlist";
import CreateAPlaylist from "../createaplaylist/CreateAPlaylist";
import OpenPlaylist from "../openplaylist/OpenPlaylist";

function App() {
  const [tracks, setTracks] = useState([]); //state for saving tracks
  const [playlistName, setPlaylistName] = useState(""); //Used to move into playlistLists.name and later add items into the list
  const data = [
    //Temp data for API call
    {name: "Missing You", artist: "Lil Something", album: "Rainy Day", id: 1 },
    {name: "Alone", artist: "Samus", album: "My Word", id: 2 },
    {name: "Alone", artist: "Melvin", album: "My Word", id: 3 },
    {name: "Make Me", artist: "Sall", album: "Lil", id: 4 },
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
    const searchName = data.filter((track) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        track.name.toLowerCase().includes(lowerCaseQuery) ||
        track.artist.toLowerCase().includes(lowerCaseQuery) ||
        track.album.toLowerCase().includes(lowerCaseQuery)
      );
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
        items: [],
      }
    ]);
  };
  //When creating, allows back button to toggle isCreating
  const toggleCreating = () => {
    setIsCreating(!isCreating);
  }
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

  const [isAdding, setIsAdding] = useState(false);
  const [showPosition, setShowPosition] = useState(null);
  const [toAdd, setToAdd] = useState(null);
  let rect = {};

  const checkPlaylist = async (e, parentId) => {
    //Adds a song to the playlist
    e.preventDefault();
    await setToAdd(parentId);
    rect = e.target.getBoundingClientRect();
    setIsAdding(!isAdding);
    setShowPosition({
      position: "absolute",
      top: rect.top,
      left: rect.left,
      marginTop: 10,
      cursor: "pointer",
    });
  };

  const handlePlaylistChoice = async (e) => {
    //Handles the playlist choice made when the user clicks 'Add to Playlist'
    e.preventDefault();
    await setPlaylistName(e.target.innerText);
    let addTrack = await data.find((item) => {
      let search = parseInt(toAdd.substring(6));
      if (item.id === search) {
        return item;
      }
    })
    const editPlaylist = playlistLists.find((playlist) => playlist.name === e.target.innerText);

    editPlaylist.items.push(addTrack);
    setIsAdding(!isAdding);
  };

  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [openPlayList, setOpenPlayList] = useState({});

  //Opens the playlist
  const findToOpen = async (e) => {
    e.preventDefault();
    let open = await playlistLists.find((playlist) => playlist.name === e.target.innerText);
    setOpenPlayList(open);
    setPlaylistOpen(!playlistOpen);
  };

  const toggleOpen = () => {
    setPlaylistOpen(!playlistOpen);
  };

  if (playlistOpen) {
    return (
      <div className="App">
        <OpenPlaylist playlist={openPlayList} open={toggleOpen} />
      </div>
    );
  } else {
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
            justifyContent: "flex-start",
            flexFlow: "row-wrap",
            width: "70%",
            float: "right",
            margin: "0 50px",
            flexWrap: "wrap",
          }}
        >
          {tracks.map((track, index) => (
            <Track
              index={index}
              track={track}
              checkPlaylist={checkPlaylist}
              // isAdding={isAdding}
              // list={playlistLists}
            />
          ))}
          {isAdding ? (
            <div style={showPosition}>
              {playlistLists.map((playlist) => (
                <p onClick={(e) => handlePlaylistChoice(e)}>{playlist.name}</p>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
          {isCreating ? (
            <CreateAPlaylist
              playlist={playlistName}
              updatePlaylistName={playListNameChangeHandler}
              submit={createdPlaylist}
              isCreating={toggleCreating}
            />
          ) : (
            <Playlist
              openPlaylist={findToOpen}
              playlist={playlistName}
              playlists={playlistLists}
              playlistItems={playlistLists}
              createPlaylist={createPlaylist}
              isCreating={isCreating}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
