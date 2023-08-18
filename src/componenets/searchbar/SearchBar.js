import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({submit, query, handleSearchChange}) {
    return (
        <form onSubmit={submit}>
            <input className={styles.input} onChange={handleSearchChange} type='text' placeholder="Search" value={query} />
        </form>
    );
}

export default SearchBar;