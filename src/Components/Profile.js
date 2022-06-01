import {useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Profile = ({profile}) => {
    const [posts,setPosts]=useState();
    const [commented_post,setCommented_post]=useState();
    const token=localStorage.getItem('token')
    const navigate=useNavigate();




    const getUserPosts=async ()=>{
        const req=await fetch(`https://taskforum.herokuapp.com/api/post/user/${profile._id}`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'Application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
        const response=await req.json();
        if(response.message==='200'){
            setPosts(response.data)
        }
        else{
            console.log(`Something went wrong ! ${response.message}`);
        }
    }

    const getUserComments=async ()=>{
        const req=await fetch(`https://taskforum.herokuapp.com/api/comment/user/${profile._id}`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'Application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
        const response=await req.json();
        if(response.message==='200'){
            setCommented_post(response.data)
        }
        else{
            console.log(`Something went wrong ! ${response.message}`);
        }
    }
    useEffect(()=>{
        if(!token){
            navigate('/')
      }
      else{
        getUserPosts()
        getUserComments()

      }
    },[])

    return ( 
        <div className="profile">
                    <h1>Your Activities</h1>
                    <h2>Posts Created By you </h2>


           {
               posts?.map((data)=>{
                   return(
                    <div className="profile_post postmain" key={data._id}>
                    <div className="post">
                       <p>
                           <strong>Title : </strong>
                           {data.title} 
                           <br />
                           <strong>Category : </strong>
                           {data.category}
                           <br />
                           <strong>Description : </strong>
                           {data.description} <br />
                       </p>
                    </div>
                </div>
                   )
               })
           }
            <div className="profile postmain ">
            <h2>Posts Commented by you:  </h2>

            {
               commented_post?.map((data)=>{
                   return(
                    <div className="profile_post1 postmain" key={data._id}>
                    <div className="post">
                       <p>
                           <strong>Title : </strong>
                           {data.post.title} 
                           <br />
                           <strong>Category : </strong>
                           {data.post.category}
                           <br />
                           <strong>Description : </strong>
                           {data.post.description} <br />
                       </p>
                    </div>
                    <div className="comment profile_comment postmain">
                        <p>
                            <strong> Comment : </strong>
                            {data.comment}
                            <br />
                        </p>
                    </div>
                </div>
                   )
               })
           }
            </div>
        </div>
     );
}
 
export default Profile;