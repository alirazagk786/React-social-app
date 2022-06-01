import {useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const User_Logout = ({setProfile}) => {
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')

    useEffect(()=> {
        setProfile('')
    },[])

    const handleSignUp=async ()=>{
        const fetchData=await fetch('https://taskforum.herokuapp.com/api/auth/signup',{
            method: 'POST',
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify({
                name: username,
                email : email,
                password : password
            })
        })
        const response=await fetchData.json()
        if(response.message==='200'){
            alert('Singin Successfully')
            navigate('/')
        }
        else {
            alert(`Something went wrong! Error log : ${response.message}` )
        }
    }
    
    return ( 
        <div className="logout">
             <div className="content">
                 <h1>Signup</h1>
               <div className="username">
                   <label htmlFor="">User Name</label>
                   <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
               </div>
               <div className="username">
                   <label htmlFor="">Email</label>
                   <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
               </div>
               <div className="password">
                   <label htmlFor="">Password</label>
                   <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
               </div>
               <div className="submit">
                   <div className="logoutbtn">
                   <button onClick={ ()=> navigate('/')}>Back</button>

                   <button onClick={ handleSignUp }>Signup</button>
                   </div>

               </div>
           </div>
        </div>
     );
}
 
export default User_Logout;