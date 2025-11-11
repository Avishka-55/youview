import React, {  useEffect, useState } from 'react'
import './PlayVide.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'



const PlayVideo = () => {
  const {videoId}= useParams()

     const [apiData,setApiData]= useState(null)
     const [channelData, setChannelData] =  useState(null)
     const [commentData, setCommentData] = useState([0])
      


    
  const fetchVideoData = async () => {
  const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

  try {
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items[0]);
  } catch (error) {
    console.error("Error fetching video data:", error);
  }
}
  const fetchOtherData = async ()=>{
        // fetching channel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items[0])

      //fetching commet_url

      const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      await fetch(comments_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    
    }
  

useEffect(()=>{
  fetchVideoData();
},[videoId])

useEffect(()=>{
  fetchOtherData();

},[apiData])

  return (
  
    <div className='play-video'>
      
      <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autolay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
      <div className="play-video-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):""} views  &nbsp; {apiData?moment.utc(apiData.snippet.publishedAt).local().fromNow():""}</p>
        
        <div>
          
            <span><img src={like} alt="" /> {apiData?value_converter(apiData.statistics.likeCount):""}</span>
           <span><img src={dislike} alt="" /> 2</span>
            <span><img src={share} alt="" /> Share</span>
            <span><img src={save} alt="" /> Save</span>
        </div>
        </div>
        <hr />
        <div className="publisher">
          <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
          <div>
            <p>
              {apiData?apiData.snippet.channelTitle:""}
              
            </p>
            <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} Subscribers</span>
          </div>
          <button>Subscribe</button>
        </div>
      <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0,240):""}
        </p>
        
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):""} Comments</h4>
        {commentData.map((item,index)=>{
          return (
            <div key={index} className="comment">
          <img src={item?item.snippet.topLevelComment.snippet.authorProfileImageUrl:""} alt="" />
          <div>
            <h3>{item?item.snippet.topLevelComment.snippet.authorDisplayName:""} <span>{item?moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow():""}</span></h3>
            <p>{item?item.snippet.topLevelComment.snippet.textOriginal:""}</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{item?value_converter(item.snippet.topLevelComment.snippet.likeCount):""}</span> 
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>

          )

        })}
        
           
      </div>
        
    </div>
  )
  
}


export default PlayVideo