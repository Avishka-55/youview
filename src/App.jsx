import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Pages/Home/Home.jsx';
import Video from './Pages/Video/Video.jsx';
import SideBar from './Components/SideBar/SideBar.jsx';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [category, setCategory] = useState(0)

  return (
    <div>
      <NavBar setSidebar={setSidebar} setSearchQuery={setSearchQuery} />
     
      <Routes>
        <Route path='/' element={<Home category={category} setCategory={setCategory} sidebar={sidebar} setSidebar={setSidebar} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />

        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App;
