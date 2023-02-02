import React from "react";
import "./SearchPage.css";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Col, Row } from "react-bootstrap";
import Spinner from "./Spinner";

export default function SearchPage() {
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState("");

  // เช็คว่ามีแต่ภาษาอังกฤษ / ตัวหนังสือ / space bar / enter เท่านั้นที่พิมพ์ได้
  const HandleChange = (event) => {
    const result = event.target.value.replace(/[^[a-zA-Z0-9._-\s]+$/gi, "");
    setMessage(result);
    // console.log(message);
  };

  // setAuthor and log
  const authorDisplay = (data) => {
    setIsLoading(true);
    console.log(data[0].name);
    setAuthor(data[0].name);
    console.log(data);
    setIsSubmit(!isSubmit);
    setIsLoading(false);
    setIsLoading(false);
  };

  // ส่งค่าไปที่ back-end(flask) และประมวณผลส่งข้อมูลกลับมา
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => authorDisplay(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="searchField2">
      {isSubmit && !isLoading ? (
        <div>
          <h2
            style={{
              marginTop: "3vh",
              marginBottom: "3vh",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            บุคคลเจ้าของบทความที่ค้นหา
          </h2>
          <Row>
            <Col xl={2} lg={2} md={2} sm={2}></Col>
            <Col>
              <img
                src="https://api.lorem.space/image/face"
                width={300}
                height={300}
                style={{ borderRadius: "20px" }}
              />
              <h4 style={{ fontWeight: "bold", marginTop: "3vh" }}>{author}</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done="75" />
              </div>
            </Col>
            <Col>
              <div
                style={{
                  fontSize: "25px",
                  marginBottom: "2vh",
                  fontWeight: "bold",
                }}
              >
                บุคคลที่มีความคล้าย
              </div>
              <div style={{ fontSize: "20px" }}>1. {author}</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done="60" />
              </div>
              <div style={{ fontSize: "20px" }}>2. {author}</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done="50" />
              </div>
              <div style={{ fontSize: "20px" }}>3. {author}</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done="40" />
              </div>
              <div style={{ fontSize: "20px" }}>4. {author}</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done="10" />
              </div>
            </Col>
            <Col xl={2} lg={2} md={2} sm={2}></Col>
          </Row>

          <div>
            <button
              className="buttonSearch"
              onClick={() => setIsSubmit(!isSubmit)}
            >
              ค้นหาอีกครั้ง
            </button>
          </div>
        </div>
      ) : !isSubmit && !isLoading ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: "3vh" }}>บทความ</h2>
            <textarea
              onChange={HandleChange}
              value={message}
              className="inputBox"
              id="search"
              name="search"
              placeholder="ข้อความภาษาอังกฤษ"
              style={{ height: "300px", borderRadius: "10px", padding: "1rem" }}
            ></textarea>
            <div>
              <button className="buttonSearch" type="submit">
                ค้นหาบุคคล
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
