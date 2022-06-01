import { useLocation ,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'

const Edit_Post = () => {
    const {state}=useLocation()
    const navigate=useNavigate()
    const [title,setTitle]=useState(state.comment ? state.comment : '')
    

    const handleUpdate=async ()=>{
        if(title){
        const request=await fetch(`https://taskforum.herokuapp.com/api/comment/${state.id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${state.token}`
                },
                body:JSON.stringify({comment : title})
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
            {/* <h4>You can only edit your name</h4> */}
            <div className="username">
                   <label htmlFor="">New comment</label>
                   <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
               </div>
               <button onClick={handleUpdate}>Update </button>
               </div>
        </div>
        </div>
     );
}
 
export default Edit_Post;