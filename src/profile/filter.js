import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const Filter = ({ onFilter }) => {
    const [selected, setSelected] = useState("1");

    const handleChange = (event) => {
        setSelected(event.target.value);
        onFilter(event.target.value);
    };

    return (
        <Row className="mb-3">
            <Col >
                <Form.Group controlId="timeFilter">
                    <br/>
                    <Form.Label><h5>Filter by time range:</h5></Form.Label>
                    <Form.Control
                        as="select"
                        value={selected}
                        onChange={handleChange}
                    >
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">1 Year</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default Filter;
