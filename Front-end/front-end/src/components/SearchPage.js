import React from "react";
import "./SearchPage.css";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Col, Row  } from "react-bootstrap";
import { Button } from 'reactstrap';
import Spinner from "./Spinner";
import CompareModal from "./CompareModal";

export default function SearchPage() {
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [tempPer, setTempPer] = useState([80, 70, 20, 20, 10]);
  const [model, setModel] = useState("Model1");
  const [model1Button, setModel1Button] = useState(true);
  const [model2Button, setModel2Button] = useState(false);
  const [model3Button, setModel3Button] = useState(false);
  const [model4Button, setModel4Button] = useState(false);

  const handleModel1ButtonClick = (e) => {
    setModel(e.target.value);
    console.log(e.target.value);
    setModel1Button(true);
    setModel2Button(false);
    setModel3Button(false);
    setModel4Button(false);
  };

  const handleModel2ButtonClick = (e) => {
    setModel(e.target.value);
    console.log(e.target.value);
    setModel1Button(false);
    setModel2Button(true);
    setModel3Button(false);
    setModel4Button(false);
  };

  const handleModel3ButtonClick = (e) => {
    setModel(e.target.value);
    console.log(e.target.value);
    setModel1Button(false);
    setModel2Button(false);
    setModel3Button(true);
    setModel4Button(false);
  };

  const handleModel4ButtonClick = (e) => {
    setModel(e.target.value);
    console.log(e.target.value);
    setModel1Button(false);
    setModel2Button(false);
    setModel3Button(false);
    setModel4Button(true);
  };


  // เช็คว่ามีแต่ภาษาอังกฤษ / ตัวหนังสือ / space bar / enter เท่านั้นที่พิมพ์ได้
  const HandleChange = (event) => {
    const result = event.target.value.replace(/[^[a-zA-Z0-9._-\s]+$/gi, "");
    setMessage(result);
    // console.log(message);
  };

  // setAuthor and log
  const authorDisplay = (data) => {
    setIsLoading(true);
    try {
      tempPercent();
      console.log(data[0].name);
      setAuthor(data[0].name);
      setText(data[0].text);
      console.log(data);
    } catch (error) {
      throw error;
    } finally {
      setIsSubmit(!isSubmit);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
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
        model: model,
      }),
    })
      .then((response) => response.json())
      .then((data) => authorDisplay(data))
      .catch((error) => console.error(error));
  };

  const tempPercent = () => {
    const sum = tempPer.reduce((a, b) => a + b, 0);
    const tmp = [];
    console.log(sum);
    for (let i = 0; i < tempPer.length; i++) {
      tmp.push(parseInt((tempPer[i] = (tempPer[i] * 100) / sum)));
      console.log(tempPer[i]);
    }
    setTempPer(tmp);
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
              <h4
                style={{
                  fontWeight: "bold",
                  marginTop: "3vh",
                  lineHeight: "80%",
                }}
              >
                1. {author}
              </h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={tempPer[0]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal message={message} text={text} />
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
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                2. {author}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={tempPer[1]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal message={message} text={text} />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                3. {author}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={tempPer[2]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal message={message} text={text} />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                4. {author}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={tempPer[3]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal message={message} text={text} />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                5. {author}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={tempPer[4]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal message={message} text={text} />
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
            <Row>
              <Col xl={10} lg={10} md={10} sm={10}>
                <textarea
                  onChange={HandleChange}
                  value={message}
                  className="inputBox"
                  id="search"
                  name="search"
                  placeholder="ข้อความภาษาอังกฤษ"
                  style={{
                    height: "300px",
                    borderRadius: "10px",
                    padding: "1rem",
                  }}
                ></textarea>
              </Col>
              <Col xl={1} lg={1} md={1} sm={1}>
                <Row style={{marginTop:"45px"}}>
                <Button color={model1Button?"primary":"secondary"} style={{width:"80%",height:"50px"}} value={"Model1"} onClick={(e) => handleModel1ButtonClick(e,"value")}>Model 1</Button>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Button color={model2Button?"primary":"secondary"} style={{width:"80%",height:"50px"}} value={"Model2"} onClick={(e) => handleModel2ButtonClick(e,"value")}>Model 2</Button>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Button color={model3Button?"primary":"secondary"} style={{width:"80%",height:"50px"}} value={"Model3"} onClick={(e) => handleModel3ButtonClick(e,"value")}>Model 3</Button>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Button color={model4Button?"primary":"secondary"} style={{width:"80%",height:"50px"}} value={"Model4"} onClick={(e) => handleModel4ButtonClick(e,"value")}>Model 4</Button>
                </Row>
              </Col>
              <Col xl={1} lg={1} md={1} sm={1}></Col>
            </Row>

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
