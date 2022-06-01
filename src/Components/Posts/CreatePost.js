import {useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {

    const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')

  if(!user_id || !token){
        navigate('/')
  }
   

    const navigate=useNavigate()
    const [title,setTitle]=useState('')
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')
    const handleCreate=async ()=>{
        if(!title|| !category || !description){
            alert('Please enter all the details')
        }
        else{
            const fetch_data= await fetch('https://taskforum.herokuapp.com/api/post/',{
                method : "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` // notice the Bearer before your token
                },
             body: JSON.stringify({
                 user: user_id,
                 title : title,
                 description: description,
                 category : category
             })
            })
            const response=await fetch_data.json();
            if(response.message=='200'){
                navigate(-1)
            }

        }
    }
    return ( 
        <div className="createpost">
           <div className="createpostcontent">
               <div className="titlepost">
                   <label htmlFor="">Title</label>
                   <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
               </div>
               <div className="titlepost">
                   <label htmlFor="">Category</label>
                   <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)}/>
               </div>
               <div className="titlepost">
                   <label htmlFor="">Description</label>
               <textarea name="" id="" cols="58" rows="5" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                  
               </div>
               <button onClick={handleCreate}>Create </button>
           </div>
        </div>
     );
}
 
export default CreatePost;