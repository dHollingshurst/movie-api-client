import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegister(username);
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required />
            </Form.Group>


            <Form.Group>
                <Form.Label>PassWord: </Form.Label>
                <Form.Control
                    type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required />
            </Form.Group>

            <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                    type="date" value={password} onChange={e => setBirthday(e.target.value)} placeholder="Enter Birthday" required />
            </Form.Group>

            <button type="submit" onClick={handleSubmit}></button>
        </Form >
    )
}

RegistrationView.PropTypes = {
    user: PropTypes.exact({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.number.isRequired
    })
};
