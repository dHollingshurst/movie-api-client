import React, { useState } from "react";
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';
import { render } from "react-dom";


export function ProfileView(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    // declare hook for each input
    const [values, setValues] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

    const validate = () => {
        let isReq = true;
        if (!name) {
            setValues({ ...values, nameErr: 'Name is required' });
            isReq = false;
        }
        if (!username) {
            setValues({ ...values, usernameErr: 'Username Required' });
            isReq = false;
        } else if (username.length < 5) {
            setValues({ ...values, usernameErr: 'Username must be 5 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password Required' });
            isReq = false;
        } else if (password.length < 8) {
            setValues({ ...values, passwordErr: 'Password must be 8 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email Required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Email is invalid' });
            isReq = false;
        }

        return isReq;
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios.get(`https://davemoviebase.herokuapp/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateAccount = (e) => {
        e.preventDefault();
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const isReq = validate();
        if (isReq) {
            axios.put(`https://davemoviebase.herokuapp.com/users/${username}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                },
                {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday
                }
            )
                .then((response) => {
                    this.setState({
                        Username: response.data.Username,
                        Password: response.data.Password,
                        Email: response.data.Email,
                        Birthday: response.data.Birthday
                    });

                    localStorage.setItem("user", this.state.Username);
                    const data = response.data;
                    console.log(data);
                    console.log(this.state.Username);
                    alert("Profile is updated!");
                    window.open("/users/:Username", "_self");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://davemoviebase.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert("Account deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <Row className="mt-5">
            <Col md={12}>
                <Form>
                    <h3>Edit information</h3>
                    <p></p>
                    <Form.Group controlId="formUsername" className="reg-form-inputs">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username" />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="formName" className="reg-form-inputs">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                        {values.nameErr && <p>{values.nameErr}</p>}
                    </Form.Group>


                    <Form.Group controlId="formPassword" className="reg-form-inputs">
                        <Form.Label>PassWord: </Form.Label>
                        <Form.Control
                            type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="Email" className="reg-form-inputs">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="updateBirthday">
                        <Form.Label>Birthday: </Form.Label>
                        <Form.Control
                            type="date" name="birthday" onChange={e => setBirthday(e.target.value)} placeholder="Enter Birthday" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={updateAccount}>Submit</Button>
                    <Button variant='warning' type='submit' onClick={handleDelete}>Delete account?</Button>
                    <Link to={'/'}>Go back to Movies</Link>
                </Form >
            </Col>
        </Row>
    );
}

ProfileView.PropTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};

