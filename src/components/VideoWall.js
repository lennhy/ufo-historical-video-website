import React, { useState, useEffect } from "react"
import { version } from 'react';
import './VideoWall.css'; // Tell webpack that Button.js uses these styles

const apiKey = process.env.REACT_APP_API_KEY;

 const VideoWall = () => {
    // name of value then name of function that obdates the value
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [players, setPlayers] = useState([]);
    const [videoClicked, setVideoClicked] = useState(null);

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
          playing: 0
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

    const yesterdaysDate = () => {
      const yesterday = new Date(new Date())
      yesterday.setDate(yesterday.getDate() - 7)
      return yesterday
    }


    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=ufo-sighthing&max-results=5&order=relevance&published-after=${yesterdaysDate()}&key=${apiKey}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.items)
                setIsLoaded(true);
                setItems(result.items);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])
    // <div id={`player-${item.id.videoId}`}></div>
    // {onYouTubeIframeAPIReady(item.id.videoId)}
                  /* {loadVideoContainer(item)} */

    const loadVideo = (item) =>{
      console.log(item)
      console.log(videoClicked)
      setVideoClicked(item.id.videoId)
      console.log(videoClicked)
      onYouTubeIframeAPIReady(videoClicked)

    }
    
    
    if (error) {
        console.log(error)
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if(items !==[]) {
        return (   
        <div className="videoDeck">
            {items.map(item => (
              <div  key={item.id.videoId} id={`player-${item.id.videoId}`} onMouseEnter={()=> setVideoClicked(item.id.videoId)} onClick={()=> loadVideo(item)}>
                <img src={item.snippet.thumbnails.medium.url}/>
              </div>
            ))}
        </div>
        );
    }


    // // 2. This code loads the IFrame Player API code asynchronously.
    // var tag = document.createElement('script');




}

export default VideoWall;