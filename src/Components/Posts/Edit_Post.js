import { useLocation ,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'

const Edit_Post = () => {
    const {state}=useLocation()
    const navigate=useNavigate()
    const [title,setTitle]=useState(state.post.title ? state.post.title : '')
    

    const handleUpdate=async ()=>{
        if(title){
        const request=await fetch(`https://taskforum.herokuapp.com/api/post/${state.post._id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${state.token}`
                },
                body:JSON.stringify({title : title})
            });
            const response =await request.json()
            if(response.message==='200'){
                alert('Updated')
                navigate(-1)
                // navigate('/user',{state : {id : profile._id , token : state.state.token}})
                
            }
        }
        else {
            alert('Please enter a valid name')
        }
        
    }


    return ( 
        <div className="editpost">
             <div className="userupdate ">
            <div className="content">
            <h4>You can only edit your post title</h4>
            <div className="username">
                   <label htmlFor="">New Title</label>
                   <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
               </div>
               <button onClick={handleUpdate}>Update </button>
               </div>
        </div>
        </div>
     );
}
 
export default Edit_Post;