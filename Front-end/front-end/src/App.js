import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <div>
      <nav>
        <div className="container">
          <Row className="Row1">
            <Col className="Col1">
              <a href="/home">
                <Row>
                  <FontAwesomeIcon icon={faHouse} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>หน้าหลัก</span>
                </Row>
              </a>
            </Col>
            <Col className="Col1">
              <a href="/search">
                <Row>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>ค้นหาบุคคล</span>
                </Row>
              </a>
            </Col>
            <Col className="Col1">
              <a href="/organizer">
                <Row>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>ผู้จัดทำ</span>
                </Row>
              </a>
            </Col>
          </Row>
        </div>
      </nav>

      <div className="searchField">
        <h2 style={{ marginTop: "50px" }}>
          <strong>CE KMITL Project 2565</strong>
        </h2>
        <h2 style={{ marginBottom: "40px" }}>
          <strong>Human Identification from Text Messages</strong>
        </h2>
        <h5 style={{ marginBottom: "40px" }}>
          <strong>วัตถุประสงค์</strong>
        </h5>
        <p>
          &emsp;&emsp;&emsp;&emsp; เว็บไซต์นี้ จัดทำขึ้น เพื่อใช้ประโยชน์
          ในการทดสอบ การแยกแยะ ตัวบุคคล จากบทความออนไลน์ โดยใช้
          เทคโนโลยีที่ชื่อว่า Machine Learning
          ซึ่งเป็นเทคโนโลยีที่สามารถทำให้ระบบคอมพิวเตอร์ เรียนรู้ได้ด้วยตนเอง
          โดยใช้ข้อมูลที่มีอยู่ โดย Machine Learning นี้ สามารถทำการ จัดหมวดหมู่
          ของข้อมูล หรือเรียกว่า Classification ได้ ซึ่งจะเป็นหัวใจหลักของการ
          แยกตัวบุคคล จากบทความ หรือ งานเขียนต่างๆ
          และสามารถพัฒนาไปสู่การระบุความเป็นไปได้ของตัวบุคคลจากข้อความ
          ที่ไม่ระบุตัวตนในโลกออนไลน์ในอนาคตได้
        </p>
        <p style={{marginTop:"40px"}}>
          &emsp;&emsp;&emsp;&emsp; ผลงานนี้ เป็นส่วนหนึ่งของวิชา COMPUTER
          ENGINEERING PROJECT ของคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์
          สถาบันเทคโนโลยีพระจอมเกล้า เจ้าคุณทหารลาดกระบัง
        </p>
      </div>
    </div>
  );
}

export default App;
