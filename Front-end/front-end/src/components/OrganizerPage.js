import React from "react";
import { useState, useEffect } from "react";
import "./OrganizerPage.css";

export default function OrganizerPage() {
  const [imageId, setImageId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageId((prevImg) => {
        if (prevImg === 3) {
          setImageId(1)
          return prevImg;
        }
        return prevImg + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    console.log(imageId);
  }, [imageId]);

  return (
    <div className="searchField3">
      <h2 style={{ marginTop: "50px" }}>
        <strong>CE KMITL Project 2565</strong>
      </h2>
      <h2 style={{ marginBottom: "20px" }}>
        
      </h2>

      <img
        src={`http://127.0.0.1:5000/image/${imageId}`}
        alt="image"
        width={400}
        height={400}
      />
    </div>
  );
}
