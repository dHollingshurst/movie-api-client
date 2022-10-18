import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';
import { render } from "react-dom";


export function ProfileView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');
    const { user, FavouriteMovies, removeFavourite, onBackClick } = props;



    const validate = () => {
        let isReq = true;

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
        axios.get(`https://davemoviebase.herokuapp/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavouriteMovies: response.data.FavouriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser(localStorage.getItem('token'));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const isReq = validate();
        const token = localStorage.getItem('token');
        console.log(isReq);
        console.log(token);
        console.log(user);
        if (isReq && token !== null && user !== null) {
            axios
                .put(
                    `https://davemoviebase.herokuapp.com/users/${user}`,

                    {
                        Username: username,
                        Password: password,
                        Email: email,
                        Birthday: birthday,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    alert('Update successful! Please log in with your new credentials');
                    localStorage.clear();
                    window.open('/', '_self');
                })
                .catch((e) => {
                    console.error(e);
                    alert('Unable to update user infos :(');
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
        <Container className="profile-container">
            <Card>
                <Card.Header className="text-center" as="h5">
                    Profile
                </Card.Header>
                <Card.Body>
                    <CardGroup>
                        <Card>
                            <span className="label text-center headline-profile-update">
                                Update profile information
                            </span>
                            <Form>
                                <Form.Group
                                    className="profile-form-group-username"
                                    controlId="formGroupUsername"
                                >
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                    />
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group
                                    className="profile-form-group-password"
                                    controlId="formGroupPassword"
                                >
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Your password must be 6 or more characters"
                                        minLength="6"
                                        required
                                    />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group
                                    className="profile-form-group-email"
                                    controlId="formGroupEmail"
                                >
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Form.Group
                                    className="profile-form-group-birthday"
                                    controlId="formGroupBirthday"
                                >
                                    <Form.Label>Date of birth:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        placeholder="Enter your birthday"
                                    />
                                    {birthdayErr && <p>{birthdayErr}</p>}
                                </Form.Group>
                                <Button
                                    className="button-profile-view-update"
                                    variant="secondary"
                                    type="submit"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Form>
                        </Card>
                        <Card>
                            <span className="label text-center headline-profile-delete">
                                Delete account
                            </span>
                            <Col>
                                <Button

                                    variant="danger"
                                    type="submit"
                                    onClick={handleDelete}
                                >
                                    DELETE ACCOUNT PERMANENTLY
                                </Button>
                            </Col>
                        </Card>
                    </CardGroup>
                    <h3>favourite Movies</h3>
                    <CardGroup>
                        {FavouriteMovies.map((m) => (
                            <Col
                                md={6}
                                lg={3}
                                key={m._id}

                            >
                                <Card>
                                    <Link
                                        to={`/movies/${m._id}`}
                                        className="profile-movie-card-link"
                                    >
                                        {<Card.Img
                                            variant="top"
                                            crossOrigin="anonymous | use-credentials"
                                            src={m.ImagePath}
                                        />}
                                        <Card.Body>
                                            <Card.Title>{m.Title}</Card.Title>
                                        </Card.Body>
                                    </Link>
                                    <Button
                                        size="sm"
                                        type="button"
                                        onClick={() => removeFavourite(m._id)}
                                    >
                                        Remove
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </CardGroup>
                </Card.Body>
                <Card.Footer>
                    <Button

                        variant="secondary"
                        onClick={() => {
                            onBackClick();
                        }}
                    >
                        Back
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
}

ProfileView.propTypes = {
    FavouriteMovies: PropTypes.array.isRequired,
};
