import React from "react";
import { Container, Col, Row } from "react-bootstrap";

function AppFooter(props) {
  return (
    <div>
      <footer style={{margin:"5px 0"}}>
        <Container>
          <Row>
            <Col className="text-center py-5">
              No Copyright &copy; PayShabby
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default AppFooter;
