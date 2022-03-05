import React from "react";
import { Link } from "react-router-dom";

function SearchBar() {
    return (
        <div className="home">
            <div class="container">
                <form>
                    <input type="text" placeholder="Search..." />
                    <input type="submit" value="search" />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;