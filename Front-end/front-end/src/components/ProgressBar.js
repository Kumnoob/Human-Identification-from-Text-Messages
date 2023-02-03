import React from "react";
import { useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ done }) {
  const [style, setStyle] = useState({});
  const [width, setWidth] = useState(true);
  

  setTimeout(() => {

    if(done < 20){
      setWidth(false)
    }

    const newStyle = width ? {
      opacity: 1,
      width: `${done}%`,
    } 
    : {
      opacity: 1,
      width: `20%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {done}%
      </div>
    </div>
  );
}
