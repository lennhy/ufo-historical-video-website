import React, { useState, useEffect } from "react"
import { version } from 'react';
import ImageCard from "./ImageCard";
import './VideoWall.css'; // Tell webpack that Button.js uses these styles

const apiKey = process.env.REACT_APP_API_KEY;

 const VideoWall = () => {
    // name of value then name of function that updates the value
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [players, setPlayers] = useState([]);
    const [videoClicked, setVideoClicked] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const tag = document.createElement("script");

    
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;

    const onYouTubeIframeAPIReady = (vidId) => {
      // First run node Api that will send and store videoid to database
      fetch('/videos', {
        method: 'POST',
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(vidId)
      }).then(()=>{
        console.log("video id added to database")
      })
    

    // let player;
    window.YT.ready(() => {
        player = new window.YT.Player(`player-${vidId}`, {
          height: "195",
          width: "320",
          videoId: vidId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          },
        });
    });
    
    }

    // 4. The API will call this function when the video player is ready.
    const onPlayerReady = (event) => {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    const onPlayerStateChange = (event) => {
      if (event.data == window.YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    const stopVideo = () => {
      player.stopVideo();
    }

    const lastWeek = () => {
      const yesterday = new Date(new Date())
      console.log(`Yesterday was ${yesterday}`)
      yesterday.setDate(yesterday.getDate() - 7)
      console.log(`Yesterday was ${yesterday}`)
      return yesterday
    }

    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=ufo-sighthing&max-results=5&order=relevance&published-after=${lastWeek()}&key=${apiKey}`)
        .then(res => res.json())
        .then(
            (result) => {
              if (result.error || result === [] || result === undefined || result === "") {
                console.log(result.error.message)
                setLoadingMessage(result.error.message)
                setError(result.error)
                setIsLoaded(false);

                // throw new Error(`HTTP error! Status: ${result.status}`);
              }else{
                console.log(result.items)
                setIsLoaded(true);
                setItems(result.items);
              }
        
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log(error)
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])
   
    const loadVideo = (item) =>{
      // Keep track of the video that was clicked 
      setVideoClicked(item.id.videoId)
      onYouTubeIframeAPIReady(videoClicked)
    }
    
    
    if (error) {
        console.log(error)
    } if (!isLoaded) {
        return (
        <div>
          <div>{loadingMessage}</div>
        <div>
          <div className="header"><h1></h1>
          </div>
        </div> 
        </div>
        );
    } else if(items !==[]) {
        return (  
          <div>
          <div className="header"><h1>Top 5 most recent UFO videos</h1>
          <div >on onYouTube</div> 
          </div>
          <div className="videoDeck">
            {items.map(item => (
              <div>
              <div className="video-container" key={item.id.videoId} id={`player-${item.id.videoId}`} onMouseEnter={()=> setVideoClicked(item.id.videoId)} onClick={()=> loadVideo(item)}>
              <img src={item.snippet.thumbnails.medium.url}/>
              </div>
              {/* Need to hav tis outside of player div because youtube Iframe will remove text after reconstructon of video when user clicks image */}
              <ImageCard 
                title={item.snippet.title} 
                description={item.snippet.description} 
              />
              </div>
            ))}
          </div>
        </div> 
        );
    }


    // // 2. This code loads the IFrame Player API code asynchronously.
    // var tag = document.createElement('script');




}

export default VideoWall;