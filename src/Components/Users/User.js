import { useLocation,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import AllPosts from "../Posts/AllPosts";
const User = ({handleSet }) => {
    const {state}=useLocation()
    const [user,setUser]=useState({...state })
    const [profile, setProfile]=useState();
    
    const getUserProfile=async ()=>{
        const request=await fetch(`https://taskforum.herokuapp.com/api/users/${user.id}`,{
            method : "GET",
            headers : {
                'Content-Type' : 'application.json',
                'Authorization' : `Bearer ${user.token}`
            },

        });
        const response =await request.json()
        if(response.message==='200'){
            setProfile(response.data)
            handleSet(response.data,user.token)
        }
        
    }
    useEffect(()=>{
        getUserProfile()
    },[])
    return ( 
        <div className="user">
           
            <AllPosts user_details={user} flag={false}/>
           
        </div>
     );
}
 
export default User;