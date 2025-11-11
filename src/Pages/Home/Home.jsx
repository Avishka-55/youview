import Feed from '../../Components/Feed/Feed';
import SideBar from '../../Components/SideBar/SideBar';
import './Home.css';

import React, { useState } from 'react'

const Home = ({sidebar, setSidebar, searchQuery,setSearchQuery,category, setCategory}) => {
  
  return (
    <div>
     {<SideBar sidebar={sidebar} setSidebar={setSidebar} setCategory={setCategory} setSearchQuery={setSearchQuery}/>} 
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed searchQuery={searchQuery} category={category} />
      </div>
    </div>
  );
}

export default Home 