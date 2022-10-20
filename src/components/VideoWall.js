import React, { useState, useEffect } from "react"
import { version } from 'react';

console.log(version);
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey)

 function VideoWall() {
    // name of value then name of function that obdates the value
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=UFO&key=${apiKey}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                setIsLoaded(true);
                setItems(result);
                console.log(items)
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
    
    if (error) {
        console.log(error)
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <ul>
            {items.map(item => (
            <li key={item.id.videoId}>
                {item.name} {item.price}
            </li>
            ))}
        </ul>
        );
    }
}

export default VideoWall;