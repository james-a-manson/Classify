import React from "react";

//this will hold the title for each page
function Header() {
    return (
        <header>
            <h1>Jam Donuts</h1>
            <button className="sign-out">
                Sign Out
            </button>
        </header>
    );
}

export default Header;