import React from "react";
import "./SearchPage.css";
import { useState } from "react";

export default function SearchPage() {
  const [message, setMessage] = useState("");

  // เช็คว่ามีแต่ภาษาอังกฤษเท่านั้นที่พิมพ์ได้
  const HandleChange = (event) => {
    const result = event.target.value.replace(/[^[a-zA-Z0-9._-\s]+$/gi, "");
    setMessage(result);
    console.log(message);
  };

  return (
    <div className="searchField2">
      <h2 style={{ marginTop: "3vh" }}>บทความ</h2>
      <textarea
        value={message}
        onChange={HandleChange}
        className="inputBox"
        id="search"
        name="search"
        placeholder="ข้อความภาษาอังกฤษ"
        style={{ height: "300px", borderRadius: "10px", padding: "1rem" }}
      ></textarea>
      <div>
        <button className="buttonSearch">ค้นหาบุคคล</button>
      </div>
    </div>
  );
}
