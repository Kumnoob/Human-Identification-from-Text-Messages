import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import "./TextModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

export default function TextModal(props) {
  const [modal, setmodal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggle = (event) => {
    event.preventDefault();
    setmodal(!modal);
    toggle.bind();
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
        <FontAwesomeIcon icon={faFileLines} st />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          ตัวอย่างบทความของ <br /> {props.id}. {props.name}
        </ModalHeader>
        <ModalBody>{props.text}</ModalBody>
      </Modal>
    </div>
  );
}
