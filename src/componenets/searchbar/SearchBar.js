import React from "react";

function SearchBar(props) {
    return (
        <form onSubmit={props.submit}>
            <input onChange={props.handleQueryChange} type='text' placeholder="Search" value={props.query} />
        </form>
    );
}

export default SearchBar;