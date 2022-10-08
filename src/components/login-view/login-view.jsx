import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardHeader, CardGroup, CardHeader, Container, Col, Row, Navbar, Nav, Button } from 'react-bootstrap';
import './login-view.scss';
import axios from "axios";
import { render } from "react-dom";
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';




export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be 5 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be 8 characters long');
            isReq = false;
        }

        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://davemoviebase.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                });
        };
    }



    return (

        <div className="login-view">

            <Container>
                <Row>
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
                                                    {usernameErr && <p>{usernameErr}</p>}
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
                                                        required />
                                                    {passwordErr && <p>{passwordErr}</p>}
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
                                                </Button> <br />

                                                New user? <br />


                                                <Link to={'/register'}>Sign up</Link>

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

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    })

};