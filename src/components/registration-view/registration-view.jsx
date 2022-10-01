import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";


export function RegistrationView(props) {
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

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (name) {
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



    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://davemoviebase.herokuapp.com/users', {
                Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration succesful, please login.');
                    window.open('/', '_self'); // the second argument _self is necessary so taht the pae will open in the curent tab
                })
                .catch(response => {
                    console.error(response);
                    alert('unable to register');
                });
        }
    };

    return (
        <Row className="mt-5">
            <Col md={12}>
                <Form>
                    <h3>Sign up</h3>
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

                    <Button variant="primary" type="submit" onClick={handleRegister}>Submit</Button>
                    <p></p>
                    <p>Already registered <Link to={'/'}>sign in</Link> here</p>
                </Form >
            </Col>
        </Row>
    );
}

RegistrationView.PropTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};
