import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import AddComment from './AddComment';

const Comment = ({ post_id}) => {

    const user_id=localStorage.getItem('user_id')
    const token=localStorage.getItem('token')
  
    if(!user_id || !token){
          navigate('/')
    }

  const navigate = useNavigate();

//   states & variables
    const [comment,setComment]=useState()
    const [less ,setLess]=useState()
    const [more,setMore]=useState()
    const [toggle,setToggle]=useState(true)
    let [flag,setFlag]=useState()
    let comment_id,arr;
    
    
    // useeffect to get All comment
    useEffect(()=>{
        getPostComment(post_id)
    },[])

    // Get All Posts
    const getPostComment = async (post_id) => {
        const req = await fetch(
          `https://taskforum.herokuapp.com/api/comment/post/${post_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await req.json();
        setComment(response.data)
        setMore(response.data)
        if (response.data.length > 3) {
         arr = response.data;
        sortComment(arr)
        } 
    }

    // sort Comments
    const sortComment=(data)=>{
        data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setLess([data[0],data[1],data[3]])
          setComment([data[0],data[1],data[3]])
           setFlag(true)
    }

   
// Delete comment
    const handleDeleteComment = async (comment_id, post_id) => {
        const request = await fetch(
          `https://taskforum.herokuapp.com/api/comment/${comment_id}`,
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
        getPostComment(post_id)
        }
      };

      const handleShow=(data)=>{
          setComment(data)
          setToggle(!toggle)
      }


    return ( 
        <div className="comment">
           {comment?.map((data1) => {
                  return (
                    <div key={comment_id=data1._id}>
                        <div className="section_comment">
                          <p>
                            <strong>Comment : </strong> {data1.comment}
                          </p>
                          {user_id === data1.user._id && (
                            <div className="edit">
                              <button
                                onClick={() =>
                                  navigate("/edit_comment", {
                                    state: {
                                      id: data1._id,
                                      comment: data1.comment,
                                      token: token,
                                    },
                                  })
                                }
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(data1._id,data1.post)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                    </div>
                  );
                })}
                { flag && 
                <>
                {  toggle && <button className='showbtn' onClick={()=>handleShow(more)}>Show more</button>}
                { !toggle && <button className='showbtn' onClick={()=>handleShow(less)}>Show less</button>}
                </>
                }
                    <AddComment comment_id={comment_id} post_id={post_id} getPostComment={getPostComment} />

        </div>
     );
}


 
export default Comment;