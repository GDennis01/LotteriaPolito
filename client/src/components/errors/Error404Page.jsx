import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const PEDRO = "/racoon-pedro.gif";

/**
 * A fun 404 error page.
 */
const ErrorPage = () => {
  return (
    <Container>
      <Row xs={3} className="d-flex align-items-center">
        <Col className="text-center">
          <div style={{ fontSize: `300px` }}>4</div>
        </Col>
        <Col className="text-center">
          <div style={{ fontSize: `300px` }}>0</div>
        </Col>
        <Col className="text-center">
          <div style={{ fontSize: `300px` }}>4</div>
        </Col>
      </Row>
      <Row className="text-center">
        <h1>The page you are looking for does not exist.</h1>
      </Row>
    </Container>
  );
};

export default ErrorPage;
