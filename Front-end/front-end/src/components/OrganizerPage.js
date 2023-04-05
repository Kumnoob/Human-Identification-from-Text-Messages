import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./OrganizerPage.css";

export default function OrganizerPage() {
  // const [imageId, setImageId] = useState(1);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setImageId((prevImg) => {
  //       if (prevImg === 3) {
  //         setImageId(1);
  //         return prevImg;
  //       }
  //       return prevImg + 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   console.log(imageId);
  // }, [imageId]);

  return (
    <div className="searchField3">
      <h2 style={{ marginTop: "50px" }}>
        <strong>CE KMITL Project 2565</strong>
      </h2>
      <h2 style={{ marginBottom: "5vh" }}></h2>
      <Row>
        <Col md={6} sm={12}>
          <img
            src={`http://127.0.0.1:5000/organizer/${62010604}`}
            alt="image"
            style={{ width: "20vw", borderRadius:"20px", boxShadow: "5px 10px 20px 0px #394A6A" }}
          />
          <h4 style={{textAlign:"center" , marginTop:"30px"}}>นายพลภัทร จงวัฒนศิริ 62010604</h4>
        </Col>
        <Col md={6} sm={12}>
          <img
            src={`http://127.0.0.1:5000/organizer/${62010785}`}
            alt="image"
            style={{ width: "20vw" }}
          />
          <h4 style={{textAlign:"center", marginTop:"30px"}}>นายลิขิตภูมิ ลิขิตงาม 62010785</h4>
        </Col>
      </Row>
    </div>
  );
}
