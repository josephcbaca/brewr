import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CommentCard from "../CommentCard";
import Navbar from "../Navbar";

function Member({ loggedIn, currentUser }) {
    const [userPost, setUserPost] = useState();
    const textInput = React.useRef();

    function createPost(e) {
        e.preventDefault();
        const bodyObj = {
            body: userPost,
            id: currentUser.id
        }
        axios.post("/api/posts", bodyObj)
            .then(res => {
                if (!res.data.errmsg) {
                    console.log("success");
                    textInput.current.value = ""
                } else {
                    console.log("ERR");
                }
            })
            .catch(err => {
                console.log("Blog post errored.  Try again.");
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
                        ref={textInput}
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
            <CommentCard currentUser={currentUser} />
        </div>
    </div>);
}


export default Member;