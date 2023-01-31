import React from "react";
import "./SearchPage.css";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function SearchPage() {
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [author, setAuthor] = useState("a");

  // เช็คว่ามีแต่ภาษาอังกฤษเท่านั้นที่พิมพ์ได้
  const HandleChange = (event) => {
    const result = event.target.value.replace(/[^[a-zA-Z0-9._-\s]+$/gi, "");
    setMessage(result);
    // console.log(message);
  };

  // setAuthor and log
  const authorDisplay = (data) => {
    setAuthor(data["body"]);
    console.log(data);
    setIsSubmit(!isSubmit);
  };

  // ส่งค่าไปที่ back-end(flask) และประมวณผลส่งข้อมูลกลับมา
  const handleSubmit = (event, props) => {
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
      {isSubmit ? (
        <div>
          <h2
            style={{
              marginTop: "3vh",
              marginBottom: "3vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            บุคคลเจ้าของบทความที่ค้นหา
          </h2>
          <img
            src="https://api.lorem.space/image/face"
            width={300}
            height={300}
          />
          <h4>{author}</h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProgressBar done="70" />
          </div>

          <div>
            <button
              className="buttonSearch"
              type="submit"
              onClick={(e) => setIsSubmit(!isSubmit)}
            >
              ค้นหาอีกครั้ง
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
