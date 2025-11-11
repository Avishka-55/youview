import './NavBar.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.jpg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/simon.png'

const NavBar = ({ setSidebar, setSearchQuery }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
    navigate('/');

   
  };

  return (
    <nav className="flex-div">
      <div className='nav-left flex-div'>
        <img 
          src={menu_icon} 
          onClick={() => setSidebar(prev=>prev===false?true:false)} 
          alt="" 
          className='menu-icon' 
        />
        <Link to={'/'}>
          <img src={logo} alt="" className='logo' />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <form className="search-box flex-div" onSubmit={handleSearch}>
          <input 
            className='input'
            type="text"
            placeholder='Search'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" style={{ border: 'none', background: 'none' }}>
            <img src={search_icon} alt="search" />
          </button>
        </form>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className='user-icon' alt="" />
      </div>
    </nav>
  );
};

export default NavBar;
