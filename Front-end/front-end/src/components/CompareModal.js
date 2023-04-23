import React from "react";
import { Button, Modal, ModalHeader, Row, Col } from "reactstrap";
import { useState } from "react";
import "./CompareModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";

export default function TextModal(props) {
  const [modal, setmodal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggle = (event) => {
    event.preventDefault();
    setmodal(!modal);
    toggle.bind();
  };

  return (
    <div className="modal-compare">
      <div className="modal-button">
        <Button
          onClick={toggle}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          style={
            isHovered
              ? { backgroundColor: "#56ccf2", border: "0" }
              : { backgroundColor: "gray", border: "0" }
          }
        >
          <FontAwesomeIcon icon={faCodeCompare} />
        </Button>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}><div style={{textAlign:"left"}}>เปอร์เซ็นความเหมือน {props.realPercent * 100} %</div></ModalHeader>
          <Row>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              style={{
                textAlign: "center",
                borderRight: "2px solid black",
                borderBottom: "2px solid black",
                borderTop: "2px solid black",
              }}
            >
              <div style={{ fontSize: "20px", margin: "20px 0 20px 0" }}>
                บทความที่ค้นหา
              </div>
            </Col>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              style={{
                textAlign: "center",
                borderBottom: "2px solid black",
                borderTop: "2px solid black",
              }}
            >
              <div style={{ fontSize: "20px", margin: "20px 0 20px 0" }}>
                ตัวอย่างบทความของคนที่ทำนาย
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              style={{
                textAlign: "center",
                borderRight: "2px solid black",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  margin: "20px 0 20px 0",
                  padding: "20px",
                  border: "0px",
                  display: "block",
                }}
              >
                {props.message}
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} style={{ textAlign: "center" }}>
              <div
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  margin: "20px 0 20px 0",
                  padding: "20px",
                }}
              >
                {props.text}
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    </div>
  );
}
