import React from "react";
import "./HomePage.css";
import { useState, useEffect} from "react";
import TextModal from "./TextModal";
import { Row, Col } from "react-bootstrap";
import Spinner from "./Spinner";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const AuthorDisplay = (data) => {
    console.log(data);
    setData(data);
    setIsLoading(true);
  };

  //fetch all authors
  useEffect(() => {
    const fetchAuthor = () => {
      fetch("http://127.0.0.1:5000/preview", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => AuthorDisplay(data))
        .catch((error) => console.error(error));
    };
    fetchAuthor();
  }, []);

  return (
    <div className="searchField">
      {isLoading ? (
        <div>
          <h2 style={{ marginTop: "50px" }}>
            <strong>CE KMITL Project 2565</strong>
          </h2>
          <h2 style={{ marginBottom: "40px" }}>
            <strong>Human Identification from Text Messages</strong>
          </h2>
          <h5 style={{ marginBottom: "40px" }}>
            <strong>ตัวอย่างข้อความ</strong>
          </h5>

          <ul>
            {data.map((author) => (
              <Row>
                <Col xl={1} lg={1} md={1} sm={1}>
                  {author.id}.
                </Col>
                <Col>
                  <li
                    key={author.id}
                    style={{ textAlign: "left", listStyle: "none" }}
                  >
                    {author.name}
                  </li>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <p>
                    <TextModal
                      id={author.id}
                      text={author.text}
                      name={author.name}
                    />
                  </p>
                </Col>
              </Row>
            ))}
          </ul>
          <p style={{ marginTop: "40px" }}>
            &emsp;&emsp;&emsp;&emsp; ผลงานนี้ เป็นส่วนหนึ่งของวิชา COMPUTER
            ENGINEERING PROJECT ของคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์
            สถาบันเทคโนโลยีพระจอมเกล้า เจ้าคุณทหารลาดกระบัง
          </p>
        </div> 
      ) : (
        <Spinner />
      )}
    </div>
  );
}
