import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../searchbar/SearchBar";
import Track from "../track/Track";
import Playlist from "../playlist/Playlist";
import CreateAPlaylist from "../createaplaylist/CreateAPlaylist";
import OpenPlaylist from "../openplaylist/OpenPlaylist";
// require("dotenv").config();

function App() {
  const [data, setData] = useState([]);
  const [showingTracks, setShowingTracks] = useState([]); //Initializes showingTracks to data
  const baseUrl = `https://my.api.mockaroo.com`;
  const endPoint = `/tracks.json`;
  const key = `?key=6846c710`;
  // const searchTerm = `?searchTerm=${query}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}${endPoint}${key}`);
      if (response.ok) {
        const jsonRes = await response.json();
        setData(jsonRes);
        console.log(data);
      }
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
    setShowingTracks(data);
  };

  //Some styles
  const playlistStyle = {
    borderBottom: "1px solid black",
    backgroundColor: "darksalmon",
    padding: 5,
    textAlign: "center",
  };

  const scrollDiv = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexFlow: "row-wrap",
    width: "70%",
    float: "right",
    margin: "0 50px",
    flexWrap: "wrap",
    maxHeight: "85vh",
    overflowY: "auto",
    overflowX: "hidden",
  };

  //
  //29 - 55 Is used for searching and returning search query results
  //
  const [query, setQuery] = useState(""); //Initializes query to empty string

  const handleSearchChange = (e) => {
    //Handles the onChange for SearchBar user input
    e.preventDefault();
    setQuery(e.target.value); //Sets the value to whatever the user typs and saves in query state
  };

  const handleSubmit = (e) => {
    //Handles the submission in SearchBar of the form to filter the tracks appearing
    e.preventDefault();
    filterTracks(query); //Calls filterTracks and passes the query
  };

  const filterTracks = (query) => {
    //Filters the tracks for any keywords matching query
    const searchName = data.filter((track) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        track.track_name.toLowerCase().includes(lowerCaseQuery) ||
        track.artist.toLowerCase().includes(lowerCaseQuery) ||
        track.album.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setShowingTracks(searchName);
  };

  //
  //61 - 95 Is used for creating a new playlist and setting the name
  //

  const [playlists, setPlaylists] = useState([]); //Initializes playlists to empty array
  const [createPlaylistName, setCreatePlaylistName] = useState(""); //Initializes createPlaylistName to empty string
  const [isCreating, setIsCreating] = useState(false); //Initializes isCreating to false

  const createPlaylist = (e) => {
    //When the name of the playlist is submitted, it opens CreateAPlaylist to set a playlistName
    e.preventDefault();
    setIsCreating(!isCreating); //Toggles whether isCreating is true or false and thus CreateAPlaylist shows or not
    if (createPlaylistName !== "") {
      //If the playlist name is not empty string
      setPlaylists((prev) => [
        //Updates the playlists array by copying all contents plus adding the new playlist
        ...prev,
        {
          key: prev.length + 1,
          name: createPlaylistName,
          items: [],
        }, //Updates the playlists array with new playlist name
      ]);
      console.log(`Created a new playlist ${createPlaylistName}`);
    }
    setCreatePlaylistName(""); //Resets the createPlaylistName to an empty string
    console.log(playlists.length);
  };

  const handleNameCreation = (e) => {
    //Updates the createPlaylistName state as it is typed to ensure accurate name
    e.preventDefault();
    setCreatePlaylistName(e.target.value);
    console.log(createPlaylistName);
  };

  const toggleCreating = () => {
    //Toggles creating mode from the back button in CreateAPlaylist
    setIsCreating(!isCreating);
  };

  //
  // 101 - 132 Is used for adding a song to a playlist
  //

  const [isAddingSong, setIsAddingSong] = useState(false);
  const [showPosition, setShowPosition] = useState({});
  const [songToAdd, setSongToAdd] = useState({});

  const handleAddSong = (e, index) => {
    e.preventDefault();
    if (playlists.length < 1) {
      //Ensures there is a playlist to add to
      alert(`Please create a playlist first!`);
      return;
    }

    setIsAddingSong(!isAddingSong); //Toggles whether the drop menu is visible
    setSongToAdd(data[index]);
    const rect = e.target.getBoundingClientRect(); //Receives the position of the button pressed
    console.log(`Adding song to playlist from ${index}`);

    if (rect) {
      //If rect has been received
      console.log(`rect exists`);
      setShowPosition({
        //Sets the showPosition state to the correct position
        position: "absolute",
        top: rect.top + 22,
        left: rect.left,
        cursor: "pointer",
        backgroundColor: "darksalmon",
        margin: 0,
        height: "min-content",
        width: 100,
      });
    }
    console.log(isAddingSong);
  };

  const choosePlaylist = (e) => {
    //When the playlist is clicked where the song needs added
    e.preventDefault();
    console.log(`Selected playlist ${e.target.innerText}`);
    setIsAddingSong(!isAddingSong); //Toggles the drop menu off
    setShowPosition({}); //Resets the showPosition
    if (!checkIfAdded(songToAdd, e.target.innerText)) {
      //Calls checkIfAdded and passes the song supposed to be added, and the name of the playlist to check that the song is not already there
      setPlaylists(
        //If checkIfAdded returns false, it will add song to the specified playlist
        (
          prev //Copies and updates the previous version of the playlists with the new songs to add
        ) =>
          prev.map((playlist) => {
            if (playlist.name === e.target.innerText) {
              //Finds the playlist with the same name
              return {
                ...playlist,
                items: [...playlist.items, songToAdd], //Adds new song to the playlist.items
              };
            }
            return playlist;
          })
      );
    } else {
      alert(`This song is already in the playlist!`); //Warns of duplicate song
    }
  };

  const checkIfAdded = (song, name) => {
    // Checks if the song is already in the playlist
    let existsInPlaylist = false; //Initializes existsInPlaylist to false
    const checkingList = playlists.find((playlist) => playlist.name === name); //returns the playlist information to be checked
    checkingList.items.forEach((item) => {
      //Checks each item for a duplicate
      if (item.id === song.id) {
        //If two ids are the same, the song is already in the playlist
        existsInPlaylist = true; //Returns true
      }
    });
    return existsInPlaylist;
  };

  //
  // 157 - 194 Is used for opening a playlist
  //

  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false); //Initializes isPlaylistOpen to false
  const [selectedPlaylist, setSelectedPlaylist] = useState({}); //Initializes selectedPlaylist to empty object

  const openPlaylist = (e) => {
    //When a playlist is clicked it toggles it to open
    const selected = e.target.innerText; //Finds the name of the playlist and sets it to selected
    console.log(`value is ${selected}`);
    setIsPlaylistOpen(!isPlaylistOpen);
    setSelectedPlaylist(
      playlists.find((playlist) => playlist.name === selected)
    ); //Makes selectedPlaylist equal to the playlist with the name
    console.log(selectedPlaylist.name);
  };

  const toggleOpen = () => {
    setIsPlaylistOpen(!isPlaylistOpen); //Toggles isPlaylistOpen when clicking back button
    setEditingName(false);
  };

  //
  // 207 - 245 Allows the user to change the name of the playlist
  //

  //Changes the playlist's name
  const [editingName, setEditingName] = useState(false); //Initializes editingName to false
  const changePlaylistName = (e) => {
    //Called when edit name button is clicked
    e.preventDefault();
    setEditingName(!editingName); //Sets editng to true
  };
  const updatingNameEdit = (e) => {
    //The onchange function for the edit name
    e.preventDefault();
    setSelectedPlaylist({
      //The selected playlist's name is updated synchronously
      ...selectedPlaylist,
      name: e.target.value,
    });
    setPlaylists(
      (
        prevPlaylists //Updates the playlists to reflect the change to the selected Playlist
      ) =>
        prevPlaylists.map((playlist) => {
          if (playlist.key === selectedPlaylist.key) {
            //Finds the playlist with the same key
            return {
              ...playlist,
              name: selectedPlaylist.name, //Updates the name
            };
          }
          return playlist; //Returns the playlist with each updated keystroke/change
        })
    );
  };

  const confirmUpdate = (e) => {
    //Called when submission is sent
    e.preventDefault();
    setPlaylists(
      (
        prevPlaylists //Updates the playlists for a final time ensuring final change is registered
      ) =>
        prevPlaylists.map((playlist) => {
          if (playlist.key === selectedPlaylist.key) {
            //Finds the playlist with the same key
            return {
              ...playlist,
              name: selectedPlaylist.name, //Takes the selectedPlaylists current/accurate name and updates
            };
          }
          return playlist; //Returns the playlist with each updated keystroke/change
        })
    );
    setEditingName(false); //Set the editing to false
  };

  //
  // 264 - 287 allows users to remove a song and updates repsonsible states
  //

  const removeSong = (e) => {
    e.preventDefault();
    console.log(
      `Removing ${e.target.previousElementSibling.innerText} from ${selectedPlaylist.name}`
    );
    const remove = parseInt(e.target.previousElementSibling.id);

    setSelectedPlaylist((prevSelectedPlaylist) => ({
      ...prevSelectedPlaylist,
      items: prevSelectedPlaylist.items.filter((item) => item.id !== remove),
    }));

    setPlaylists((prevPlaylists) => {
      return prevPlaylists.map((playlist) => {
        if (playlist.key === selectedPlaylist.key) {
          return {
            ...playlist,
            items: playlist.items.filter((item) => item.id !== remove),
          };
        }
        return playlist;
      });
    });
  };

  if (isPlaylistOpen) {
    return (
      <OpenPlaylist
        confirmUpdate={confirmUpdate}
        updatingNameEdit={updatingNameEdit}
        playlist={selectedPlaylist}
        open={toggleOpen}
        changePlaylistName={changePlaylistName}
        editingName={editingName}
        removeSong={removeSong}
      />
    );
  } else {
    return (
      <div className="App">
        <SearchBar
          submit={handleSubmit}
          query={query}
          handleSearchChange={handleSearchChange}
        />

        <div style={scrollDiv}>
          {showingTracks.map((track, index) => (
            <Track
              track={track}
              index={index}
              key={track.id}
              handleAddSong={handleAddSong}
            />
          ))}
          {isAddingSong ? (
            <div style={showPosition}>
              {playlists.map((playlist, index) => {
                return (
                  <p
                    onClick={choosePlaylist}
                    style={playlistStyle}
                    id={`opt-${index}`}
                    key={`listOpt-${index}`}
                  >
                    {playlist.name}
                  </p>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            height: "85vh",
            overflowY: "auto",
            borderRight: "1px solid black",
            boxShadow: "5px 0px 2px black",
          }}
        >
          {isCreating ? (
            <CreateAPlaylist
              isCreating={toggleCreating}
              updateName={handleNameCreation}
              playlistName={createPlaylistName}
              submit={createPlaylist}
            />
          ) : (
            <Playlist
              playlists={playlists}
              playlistName={createPlaylistName}
              createPlaylist={createPlaylist}
              openPlaylist={openPlaylist}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
