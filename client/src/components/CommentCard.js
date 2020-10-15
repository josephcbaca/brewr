import React, { useState } from 'react';
import axios from 'axios';

function CommentCard(props) {

    const currentUserId = props.currentUser.id;
    const [listPosts, setListPosts] = useState([]);

        axios.get("/api/posts/", {
            params: {
                UserId: currentUserId
            }
        })
        .then(res => {
            console.log(res)
            setListPosts(res.data);
        }).catch(err => console.log(err));

    return (<div>
        <div className="card col-4 mb-2">
            {listPosts.map(post => <div className="row" key={post.id}>
                <h6 className="col-2">{post.body}</h6>
            </div>)}
        </div>
    </div>);
};

export default CommentCard;