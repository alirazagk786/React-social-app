import { useNavigate } from "react-router-dom";

const Post = ({ data, user,flag, getAllPosts }) => {


    const user_id=localStorage.getItem('user_id')
    const token=localStorage.getItem('token')
  
    if(!user_id || !token){
          navigate('/')
    }

  const navigate = useNavigate();
  const handleDeletePost = async (id) => {
    const request = await fetch(
      `https://taskforum.herokuapp.com/api/post/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await request.json();
    if (response.message === "200") {
      alert("Deleted");
      getAllPosts();
    }
  };



  return (
    <div className="posttt">
      <div className="section_post">
        <div>
          <p> <strong>Title : </strong>
           {data.title} 
           <br/>
           <strong>Category : </strong> 
           {data.category}
           <br />
           <strong>
          Description : </strong>
          {data.description}
          <br />
          </p>
        </div>
        {!flag && <div className="edit">
          {data.user && data.user._id == user_id && (
            <>
              <button
                onClick={() =>
                  navigate("/edit_post", {
                    state: { post: data, token: token },
                  })
                }
              >
                Edit 
              </button>
              <button onClick={() => handleDeletePost(data._id)}>
                Delete
              </button>
            </>
          )}
        </div> 
        }
      </div>
      
    </div>
  );
};

export default Post;
