import { useLocation,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'

const UserUpdate = ({pro}) => {
    const navigate=useNavigate()
    const [profile, setProfile]=useState(pro);
    const [username,setUsername]=useState(pro.name ? pro.name : '')

    const token=localStorage.getItem('token')

    useEffect(()=> {
        if(!token){
            navigate('/')
      }
      
    },[])
    
    const handleUpdate=async ()=>{
        if(username){
        const request=await fetch(`https://taskforum.herokuapp.com/api/users/${profile._id}`,{
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body:JSON.stringify({name : username})
            });
            const response =await request.json()
            if(response.message==='200'){
                alert('Updated')
                navigate(-1)
                
            }
        }
        else {
            alert('Please enter a valid name')
        } 
    }
    
    return ( 
        <>
        <div className="userupdate ">
            <div className="content">
            <h4>You can only edit your name</h4>
            <div className="username">
                   <label htmlFor="">User Name</label>
                   <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
               </div>
               <button onClick={handleUpdate}>Update </button>
              
            </div>
        </div>
        </>
     );
}
 
export default UserUpdate;