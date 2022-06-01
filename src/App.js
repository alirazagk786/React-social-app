import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import User_Login from './Components/Users/User_Login';
import User_Logout from './Components/Users/User_Logout';
import CreatePost from './Components/Posts/CreatePost';
import UserUpdate from './Components/Users/UserUpdate';
import Delete_Post from './Components/Posts/Delete_Post';
import Edit_Post from './Components/Posts/Edit_Post';
import AllPosts from './Components/Posts/AllPosts';
import Home from './Components/Home';
import Profile from './Components/Profile'
import EditComment from './Components/Comments/EditComment'
import {useState} from 'react'
import Navbar from './Components/Navbar';




function App() {

  const token=localStorage.getItem('token')
  const [profile, setProfile]=useState();

  
 
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar profile={profile}/>
     
      <Routes>
        <Route path='/' element={<User_Login setProfile={setProfile}/>}></Route>
        <Route path='logout' element={<User_Logout setProfile={setProfile}/>}/>
        < Route path='/home' element={<Home  setProfile={setProfile}/>}/>
           
        {   token &&
        <>
          < Route path='/setting' element={<UserUpdate pro={profile}/>}/>
          < Route path='/profile' element={<Profile profile={profile}/> }/>
          < Route path='/delete_post' element={<Delete_Post/>}/>
          < Route path='/edit_post' element={<Edit_Post/>}/>
          <Route path='/all_post' element={<AllPosts/>}/>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path='/createpost' element={<CreatePost/>}/>
          <Route path='/edit_comment' element={<EditComment/>}/> 
          </>}
          <Route path="*" element={<User_Login setProfile={setProfile} />} />
       </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
