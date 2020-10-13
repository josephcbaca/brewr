import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "../Navbar";

function Member({ loggedIn, currentUser }) {
    const [userPost, setUserPost] = useState();
console.log(currentUser.id)
    function createPost(e) {
        e.preventDefault();
        const bodyObj = {
            body: userPost,
            id: currentUser.id
        }
        console.log(bodyObj);
        axios.post("/api/posts", bodyObj)
            .then(res => {
                console.log(res);
                if (!res.data.errmsg) {
                    console.log("success");
                    // history.push("/");
                } else {
                    console.log("ERR");
                }
            })
            .catch(err => {
                console.log("Signup Error: ");
                console.log(err);
            })
    }

    if (!loggedIn) return (<p className="black-headings"> Please log in before browsing games! <Link className="link-text" to="/login">Login</Link>
    </p>);
    return (<div>
        <Navbar loggedIn={loggedIn} />
        <div className="container">
            <form>
                <div className="form-group col-6">
                    <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Tell us your beer thoughts!"
                        name="body"
                        onChange={e => setUserPost(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="btn btn-outline-dark submit btn-lg"
                        onClick={createPost}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>);
}


export default Member;