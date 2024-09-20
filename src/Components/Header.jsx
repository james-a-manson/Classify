import React from "react";

//this will hold the title for each page
function Header(props) {
    return (
        <header>
        <h1>{props.title}</h1>
        </header>
    );
}

export default Header;