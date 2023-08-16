import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../searchbar/SearchBar";
import Track from "../track/Track";
import Playlist from "../playlist/Playlist";

function App() {
  const [tracks, setTracks] = useState([]); //state for saving tracks
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

  console.log(tracks);
  return (
    //Returns the components into the render
    <div className="App">
      <SearchBar
        submit={handleFormSubmit}
        query={query}
        handleQueryChange={handleQueryChange}
      />
      {tracks.map((track) => (
        <Track track={track} />
      ))}
      <Playlist />
    </div>
  );
}

export default App;
