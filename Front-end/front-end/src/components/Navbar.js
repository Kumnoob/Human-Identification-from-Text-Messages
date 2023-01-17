import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [homeIconActive, setHomeIconActive] = useState(false);
  const [searchIconActive, setSearchIconActive] = useState(false);
  const [organizerIconActive, setOrganizerIconActive] = useState(false);

  const handleHomeIconClick = () => {
    setHomeIconActive(true);
    setSearchIconActive(false);
    setOrganizerIconActive(false);
    
  };

  const handleSearchIconClick = () => {
    setSearchIconActive(true);
    setHomeIconActive(false);
    setOrganizerIconActive(false);
  };

  const handleOrganizerIconClick = () => {
    setOrganizerIconActive(true);
    setHomeIconActive(false);
    setSearchIconActive(false);
  };

  useEffect(() => {
    console.log("homeIconActive", homeIconActive);
  }, [homeIconActive]);

  useEffect(() => {
    console.log("searchIconActive", searchIconActive);
  }, [searchIconActive]);

  useEffect(() => {
    console.log("organizerIconActive", organizerIconActive);
  }, [organizerIconActive]);

  useEffect(() => {
    window.localStorage.setItem('homeIconActive', JSON.stringify(homeIconActive));
  }, [homeIconActive]);

  useEffect(() => {
    window.localStorage.setItem('searchIconActive', JSON.stringify(searchIconActive));
  }, [searchIconActive]);

  useEffect(() => {
    window.localStorage.setItem('organizerIconActive', JSON.stringify(organizerIconActive));
  }, [organizerIconActive]);

  useEffect(() => {
    const data = window.localStorage.getItem('homeIconActive');
    if ( data !== null ) setHomeIconActive(JSON.parse(data));

    const data2 = window.localStorage.getItem('searchIconActive');
    if ( data2 !== null ) setSearchIconActive(JSON.parse(data2));

    const data3 = window.localStorage.getItem('organizerIconActive');
    if ( data3 !== null ) setOrganizerIconActive(JSON.parse(data3));

  }, []);

  return (
    <div>
      <nav>
        <div className="container">
          <Row className="Row1">
            <Col xl={2} lg={2} md={2}></Col>
            <Col className="Col1">
              <Link
                to="/"
                onClick={handleHomeIconClick}
                className={homeIconActive ? "white-icon" : "black-icon"}
              >
                <Row>
                  <FontAwesomeIcon icon={faHouse} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>หน้าหลัก</span>
                </Row>
              </Link>
            </Col>
            <Col className="Col1">
              <Link
                to="/search"
                onClick={handleSearchIconClick}
                className={searchIconActive ? "white-icon" : "black-icon"}
              >
                <Row>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>ค้นหาบุคคล</span>
                </Row>
              </Link>
            </Col>
            <Col className="Col1">
              <Link
                to="/organizer"
                onClick={handleOrganizerIconClick}
                className={organizerIconActive ? "white-icon" : "black-icon"}
              >
                <Row>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </Row>
                <Row>
                  <span style={{ textAlign: "center" }}>ผู้จัดทำ</span>
                </Row>
              </Link>
            </Col>
            <Col xl={2} lg={2} md={2}></Col>
          </Row>
        </div>
      </nav>
    </div>
  );
}
