import React from "react";
import "./SearchPage.css";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Col, Row } from "react-bootstrap";
import { Button } from "reactstrap";
import Spinner from "./Spinner";
import CompareModal from "./CompareModal";
import ExampleModal from "./ExampleModal";

export default function SearchPage() {
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [author1, setAuthor1] = useState("");
  const [text1, setText1] = useState("");

  const [author2, setAuthor2] = useState("");
  const [text2, setText2] = useState("");

  const [author3, setAuthor3] = useState("");
  const [text3, setText3] = useState("");

  const [author4, setAuthor4] = useState("");
  const [text4, setText4] = useState("");

  const [author5, setAuthor5] = useState("");
  const [text5, setText5] = useState("");

  const [percent, setPercent] = useState([]);

  const [realPer1, setrealPer1] = useState();
  const [realPer2, setrealPer2] = useState();
  const [realPer3, setrealPer3] = useState();
  const [realPer4, setrealPer4] = useState();
  const [realPer5, setrealPer5] = useState();

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
  const AuthorDisplay = (data) => {
    setIsLoading(true);
    try {
      console.log(data);

      console.log("rank 1 is ", data[0][0].id, ".", data[0][0].name);
      setAuthor1(data[0][0].name);
      setText1(data[0][0].text);

      console.log("rank 2 is ", data[1][0].id, ".", data[1][0].name);
      setAuthor2(data[1][0].name);
      setText2(data[1][0].text);

      console.log("rank 3 is ", data[2][0].id, ".", data[2][0].name);
      setAuthor3(data[2][0].name);
      setText3(data[2][0].text);

      console.log("rank 4 is ", data[3][0].id, ".", data[3][0].name);
      setAuthor4(data[3][0].name);
      setText4(data[3][0].text);

      console.log("rank 5 is ", data[4][0].id, ".", data[4][0].name);
      setAuthor5(data[4][0].name);
      setText5(data[4][0].text);
      const a = data[5][0];
      const b = data[5][1];
      const c = data[5][2];
      const d = data[5][3];
      const e = data[5][4];

      setrealPer1(a);
      setrealPer2(b);
      setrealPer3(c);
      setrealPer4(d);
      setrealPer5(e);

      const sum = a + b + c + d + e;

      const per1 = (a * 100) / sum;
      const per2 = (b * 100) / sum;
      const per3 = (c * 100) / sum;
      const per4 = (d * 100) / sum;
      const per5 = (e * 100) / sum;

      percent.push(parseInt(per1));
      percent.push(parseInt(per2));
      percent.push(parseInt(per3));
      percent.push(parseInt(per4));
      percent.push(parseInt(per5));

      console.log(percent);
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
      .then((data) => AuthorDisplay(data))
      .catch((error) => console.error(error));
  };

  const resetSubmit = () => {
    setIsSubmit(!isSubmit);
    setPercent([]);
  };

  return (
    <div className="searchField2" style={isLoading ? { height: "593px" } : {}}>
      {isSubmit && !isLoading ? (
        <div>
          <Col xm={12} xs={12}>
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
          </Col>

          <Row>
            <Col xl={2} lg={2} md={2} sm={0}></Col>
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
                1. {author1}
              </h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={percent[0]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal
                  realPercent={realPer1}
                  message={message}
                  text={text1}
                />
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
                2. {author2}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={percent[1]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal
                  realPercent={realPer2}
                  message={message}
                  text={text2}
                />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                3. {author3}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={percent[2]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal
                  realPercent={realPer3}
                  message={message}
                  text={text3}
                />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                4. {author4}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={percent[3]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal
                  realPercent={realPer4}
                  message={message}
                  text={text4}
                />
              </div>
              <div style={{ fontSize: "20px", lineHeight: "80%" }}>
                5. {author5}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ProgressBar done={percent[4]} />
                <div style={{ padding: "10px" }}></div>
                <CompareModal
                  realPercent={realPer5}
                  message={message}
                  text={text5}
                />
              </div>
            </Col>
            <Col xl={2} lg={2} md={2} sm={0}></Col>
          </Row>

          <div>
            <button
              className="buttonSearch"
              onClick={() => resetSubmit()}
              style={{ marginBottom: "20px" }}
            >
              ค้นหาอีกครั้ง
            </button>
          </div>
        </div>
      ) : !isSubmit && !isLoading ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: "3vh", marginLeft:"170px" }}>บทความ</h2>
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
                <Row style={{ marginTop: "45px" }}>
                  <Button
                    color={model1Button ? "primary" : "secondary"}
                    style={{ width: "80%", height: "50px", margin: "0 auto" }}
                    value={"Model1"}
                    onClick={(e) => handleModel1ButtonClick(e, "value")}
                  >
                    Model 1
                  </Button>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Button
                    color={model2Button ? "primary" : "secondary"}
                    style={{ width: "80%", height: "50px", margin: "0 auto" }}
                    value={"Model2"}
                    onClick={(e) => handleModel2ButtonClick(e, "value")}
                  >
                    Model 2
                  </Button>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Button
                    color={model3Button ? "primary" : "secondary"}
                    style={{ width: "80%", height: "50px", margin: "0 auto" }}
                    value={"Model3"}
                    onClick={(e) => handleModel3ButtonClick(e, "value")}
                  >
                    Model 3
                  </Button>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Button
                    color={model4Button ? "primary" : "secondary"}
                    style={{ width: "80%", height: "50px", margin: "0 auto" }}
                    value={"Model4"}
                    onClick={(e) => handleModel4ButtonClick(e, "value")}
                  >
                    Model 4
                  </Button>
                </Row>
              </Col>
              <Col xl={1} lg={1} md={1} sm={1}></Col>
            </Row>

            <Row>
              <Col xl={4} lg={4} md={4} sm={4}></Col>
              <Col xl={3} lg={3} md={12} sm={12}>
                <button
                  className="buttonSearch"
                  type="submit"
                  style={{ marginBottom: "20px" }}
                >
                  ค้นหาบุคคล
                </button>
              </Col>
              <Col
                xl={1}
                lg={1}
                md={12}
                sm={12}
                style={{ alignSelf: "center" }}
              >
                <ExampleModal />
              </Col>
              <Col xl={4} lg={4} md={4} sm={4}></Col>
            </Row>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
