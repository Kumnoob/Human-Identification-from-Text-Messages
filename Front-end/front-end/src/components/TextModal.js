import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useRef } from "react";
import "./TextModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

export default function TextModal(props) {
  const [modal, setmodal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef(null);

  const toggle = (event) => {
    event.preventDefault();
    setmodal(!modal);
    toggle.bind();
  };

  const handleCopy = () => {
    if (textRef.current !== null) {
      const range = document.createRange();
      range.selectNode(textRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      alert("คัดลอกบทความแล้ว")
    }
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
        <FontAwesomeIcon icon={faFileLines}/>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          ตัวอย่างบทความของ <br /> {props.id}. {props.name}
        </ModalHeader>
        <ModalBody><div ref={textRef} id="copy">{props.text}</div></ModalBody>
        <ModalFooter><button type="button" class="btn btn-primary" onClick={handleCopy}>คัดลอกบทความ</button></ModalFooter>
      </Modal>
    </div>
  );
}
