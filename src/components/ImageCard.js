import React, { useState, useEffect } from "react"
import { version } from 'react';

const ImageCard = (props) => {
console.log(props)
    return(
        <div>
            <div className="h4">{props.title}</div>
            <div className="description">{props.description}</div> 
        </div>
    )


}

export default ImageCard;