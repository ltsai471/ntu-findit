import React, { useState, useEffect } from "react";

function SearchBar(props) {
    return (
        <div className="home">
            <div class="container">
                <form>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={props.queryText}
                        onChange={event => props.onQueryTextChange(event.target.value)}
                    />
                    {/* <input type="text" placeholder="Search..." /> */}
                    <input type="submit" value="search" />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;