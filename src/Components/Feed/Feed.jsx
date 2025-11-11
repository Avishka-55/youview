import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    let apiURL = '';

    if (searchQuery && searchQuery.trim() !== '') {
      // when searching
      apiURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&type=video&key=${API_KEY}`
    } else {
      // normal trending videos by category
      apiURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
    }

    const res = await fetch(apiURL)
    const result = await res.json()

    if (result.items) {
      setData(result.items)
    }
  }

  useEffect(() => {
   
    fetchData()
  }, [category, searchQuery]) 
 
  

  return (
    <div className='feed'>
      {data.map((item, index) => {
        const videoId = item.id.videoId || item.id;
        const categoryId = item.snippet.categoryId || 0; 
        return (
          <Link 
  to={`video/${categoryId}/${videoId}`} 
  className='card' 
  key={index}
>

            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            {item.statistics && (
              <p>{`${value_converter(item.statistics.viewCount)} views • ${moment(item.snippet.publishedAt).fromNow()}`}</p>
            )}
          </Link>
        );
      })}
    </div>
  )
}

export default Feed
