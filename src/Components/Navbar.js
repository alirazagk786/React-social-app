import {  Link} from 'react-router-dom';

const Navbar = ({profile}) => {
    return ( 
        <div className="welcome">
         {
           profile && 
           <>
           <h1 className='headerName'>Welcome ! {profile && profile.name}</h1>
           <div className="buttons">
           <Link className='link1' to='/home'>Home</Link>
           <Link className='link1' to='/profile'> Profile</Link>
           <Link className='link1' to='/setting'>Setting</Link>
           </div>
           <Link className='link1' to='/'><button onClick={()=> localStorage.clear() }>Log out</button></Link>
           </>
         }    
            </div>
     );
}
 
export default Navbar;