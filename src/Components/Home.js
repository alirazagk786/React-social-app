
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import AllPosts from "./Posts/AllPosts";
const Home = ({setProfile}) => {
    const navigate=useNavigate();
    const token=localStorage.getItem('token')
    const user_id=localStorage.getItem('user_id')

//   const [profile, setProfile]=useState();


    const getUserProfile=async ()=>{
      const request=await fetch(`https://taskforum.herokuapp.com/api/users/${user_id}`,{
          method : "GET",
          headers : {
              'Content-Type' : 'application.json',
              'Authorization' : `Bearer ${token}`
          },
  
      });
      const response =await request.json()
      if(response.message==='200'){
          setProfile(response.data)
      }
  }

    useEffect(()=>{
      if(!token){
            navigate('/')
      }
      else{
          getUserProfile()

      }
     },[])
    
    return ( 
        <div className="user">
           
            <AllPosts  />
           
        </div>
     );
}
 
export default Home;