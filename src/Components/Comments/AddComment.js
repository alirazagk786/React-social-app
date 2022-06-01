import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddComment = ({post_id ,getPostComment}) => {

  const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')

  if(!user_id || !token){
        navigate('/')
  }

  const [comment, setComment] = useState('');
  const navigate = useNavigate();



  const handleCreateComment = async () => {
    if (comment) {
      const fetch_data = await fetch(
        "https://taskforum.herokuapp.com/api/comment/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`, // notice the Bearer before your token
          },
          body: JSON.stringify({
            user: user_id,
            comment: comment,
            post: post_id,
          }),
        }
      );
      const response = await fetch_data.json();
      if (response.message == "200") {
        alert("Created");
        setComment('')
        getPostComment(post_id)
      }
    } else {
      alert("write Something!");
    }
  };

    return ( 
        <div className="commentt">
                  <input
                    type="text"
                    placeholder="Comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={() => handleCreateComment()}>
                    Comment
                  </button>
                </div>
     );
}
 
export default AddComment;