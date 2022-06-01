import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "../Comments/Comment";
import Post from "./Post";

const AllPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();

  const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')


  const getAllPosts = async () => {
    const fetch_data = await fetch(
      "https://taskforum.herokuapp.com/api/post/",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      }
    );
    const response = await fetch_data.json();
    setPosts(response.data);
  };
  useEffect(() => {
    if(!user_id || !token){
        navigate('/')
  }
  else{
    getAllPosts();
      
  }
  }, []);

  return (
    <div className="allpost">
        <button className="createpostbtn" onClick={() => navigate("/createpost")}>
          Create Post
        </button>
      <div className="postmain">
        {posts?.map((data) => {
          return (
            <div className="post" key={data._id}>
              <Post
                data={data}
                getAllPosts={getAllPosts}
              />
              <Comment  post_id={data._id} />
            
            </div>
          );
        })}
      </div> 
    </div>
  );
};


export default AllPosts;
