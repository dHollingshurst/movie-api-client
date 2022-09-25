import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardHeader, CardGroup, CardHeader, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import './login-view.scss';
import axios from "axios";



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* send request to server for authentication */
        /* then call props.onLoggeIn(username) */
        props.onLoggedIn(username);
    };


    return (
        <div className="login-view">
            <Navbar className=" flixBar mb-5" bg="dark" variant="dark">
                <Container className="navContainer" fluid>


                    <Navbar.Brand href="index.html">My-Flix</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="navText">
                            New user? <a href="#register" className="signUp">Sign up</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <CardGroup>
                            <Card>
                                <Card.Body className="loginBody">
                                    <Card.Title>Login here</Card.Title>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formGroupUsername">
                                                    <Form.Label>Username:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        placeholder="Enter username"
                                                        required />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <Form.Label>Password:</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        placeholder="Enter password. Minimum 8 characters"
                                                        minLength="8"
                                                        required />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Button className="mb-3"
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={handleSubmit}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>

                    </Col>
                    <Col>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

LoginView.PropTypes = {
    user: PropTypes.exact({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    })
};