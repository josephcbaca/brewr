import React from "react";
import axios from "axios";

function Navbar({ loggedIn }) {


  function logout() {
    axios.get("/logout").then(window.location.replace("/"));
  }

  return (
    <div className="container d-flex">

<h3 className="nav-name">brewR</h3>
      {loggedIn ? <button type="button" className="ml-auto btn btn-outline-dark site-button" onClick={logout}> Logout </button> : null}

    </div>
  );
}

export default Navbar;