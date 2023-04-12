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
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [homeIconActive, setHomeIconActive] = useState(false);
  const [searchIconActive, setSearchIconActive] = useState(false);
  const [organizerIconActive, setOrganizerIconActive] = useState(false);
  const { pathname } = useLocation();
  
  useEffect(() => {
    const storedValue1 = localStorage.getItem('homeIconActive') === 'true';
    const storedValue2 = localStorage.getItem('searchIconActive') === 'true';
    const storedValue3 = localStorage.getItem('organizerIconActive') === 'true';

    setHomeIconActive(pathname === '/' ? true : storedValue1);
    setSearchIconActive(pathname === '/search' ? true : storedValue2);
    setOrganizerIconActive(pathname === '/organizer' ? true : storedValue3);
  }, [pathname]);

  return (
    <div>
      <nav>
        <img src="/kmitl_logo.png" width="159" height="67.5" className="kmitl_logo"/>
        <div className="container">
          <Row className="Row1">
            <Col xl={2} lg={2} md={2}></Col>
            <Col className={homeIconActive ? "Col-white" : "Col-black"}>
              <Link
                to="/"
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
            <Col className={searchIconActive ? "Col-white" : "Col-black"}>
              <Link
                to="/search"
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
            <Col className={organizerIconActive ? "Col-white" : "Col-black"}>
              <Link
                to="/organizer"
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
