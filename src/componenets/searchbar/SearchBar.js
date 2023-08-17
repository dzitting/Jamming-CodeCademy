import React from "react";

function SearchBar({submit, query, handleSearchChange}) {
    return (
        <form onSubmit={submit}>
            <input onChange={handleSearchChange} type='text' placeholder="Search" value={query} />
        </form>
    );
}

export default SearchBar;