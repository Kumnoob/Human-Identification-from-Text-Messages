import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./ExampleModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";
import TextModal from "./TextModal";

export default function ExampleModal() {
  const [modal, setmodal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggle = (event) => {
    event.preventDefault();
    setmodal(!modal);
    toggle.bind();
    if(modal === false)
    {
      fetchAuthor();
    }
    
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const AuthorDisplay = (data) => {
    console.log(data);
    setData(data);
    setIsLoading(true);
  };

  //fetch all authors
  const fetchAuthor = () => {
    fetch("http://127.0.0.1:5000/example", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => AuthorDisplay(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
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
        <FontAwesomeIcon icon={faFileLines}/><span style={{marginLeft:"5px", fontSize:"15px"}}>ตัวอย่าง</span>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          ตัวอย่างบทความ
        </ModalHeader>
        <ModalBody>
            {isLoading? <ul>
            {data.map((example) => (
            <Row>
                <Col xl={1} lg={1} md={1} sm={1}>
                {example[0].id}.
                </Col>
                <Col>
                <li
                    key={example[0].id}
                    style={{ textAlign: "left", listStyle: "none" }}
                >
                    {example[0].employee}
                </li>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <p>
                    <TextModal
                    id={example[0].id}
                    text={example[0].body}
                    name={example[0].employee}
                    />
                </p>
                </Col>
            </Row>
            ))}
            </ul>
            :<Spinner/>
            }
        </ModalBody>
      </Modal>
    </div>
  );
}