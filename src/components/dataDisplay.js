import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const DataDisplay = (props) => {
    return(
        <Container fluid className="p-0" style={{}}>
            <Row>
                <Col xs={2 } style={{fontSize:"2em"}}>
                    <p>{props.OrderNum}</p>
                </Col>
                <Col xs={6} style={{fontSize:"2em"}}>
                    <p>{props.Name}</p>
                </Col>
                <Col xs={4} className="text-end" style={{fontSize:"2em" }}>
                    <p>{props.Score}</p>
                </Col>
            </Row>
        </Container>
    )
}
export default DataDisplay;