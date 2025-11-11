import React, { useEffect } from 'react'
import './Recommended.css'
import { API_KEY } from '../../data'
import { useState } from 'react'
import { value_converter } from '../../data'
import { Link } from 'react-router-dom'



const Recommended = ({categoryId}) => {

    const [apiData, setApiData]= useState([])
    const fetchData = async ()=>{
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        try {
        const res = await fetch(relatedVideo_url)
        const data = await res.json()
         console.log(data)
        setApiData(data.items)
        }
   
       catch (error) {
             console.error("Error fetching video data:", error);
       }
    }

    useEffect(()=>{
        fetchData();
       

    },[])

return (
    <div className='recommended'>
    {apiData.map((item,index)=>{
        return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item?item.snippet.thumbnails.medium.url:""} alt="" />
            <div className="vid-info">
                <h4>{item?item.snippet.title.slice(0,50):""}</h4>
                <p>{item?item.snippet.channelTitle:""}</p>
                <p>{item?value_converter(item.statistics.viewCount):""}</p>
                </div>
        </Link>

        )
        
    })}
    
        
    </div>
  )
}

export default Recommended

{/*
  */}