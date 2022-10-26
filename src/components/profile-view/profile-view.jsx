import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';
import { render } from "react-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import './profile-view.scss';




export function ProfileView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favouriteMovies, setFavouriteMovies] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    const { user, removeFavourite, onBackClick, movies } = props;




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
        axios
            .get(`https://davemoviebase.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // this.setState({
                //   Username: response.data.Username,
                //   Password: response.data.Password,
                //   Email: response.data.Email,
                //   Birthday: response.data.Birthday,
                //   FavouriteMovies: response.data.FavouriteMovies,
                // });
                setUsername(response.data.Username);
                //setPassword(response.data.Password);
                setEmail(response.data.Email);
                setBirthday(response.data.Birthday);
                setFavouriteMovies(response.data.FavouriteMovies);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getUser(localStorage.getItem('token'));
    }, []);

    const favouriteMoviesList = movies.filter((m) => {
        return favouriteMovies.includes(m._id);
    });

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
            <Row>
                <Col></Col>
                <Col xs={12} md={6} sm={8}>

                    <Card>
                        <Card.Body>
                            <h2>Update user information</h2>
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
                                        //placeholder="Your password must be 8 or more characters"
                                        minLength="8"
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
                                <Button
                                    className="update-profile-button"

                                    type="submit"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>

                    </Card>

                </Col>
                <Col></Col>
            </Row>

            <Row>
                <Col></Col>
                <Col xs={12} md={6} sm={8}>
                    <Card>
                        <Card.Body>
                            <h2>Unregister</h2>
                            <Button

                                className="unregister-button"
                                type="submit"
                                onClick={handleDelete}
                            >
                                Unregister
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>



            <h3>Favourite Movies</h3>

            <CardGroup className="fav-group">
                {favouriteMoviesList.map((m) => (
                    <Col className="fav-card"
                        xs={12}
                        md={6}
                        lg={3}
                        key={m._id}

                    >
                        <Card>
                            <CardHeader className="card-header">
                                <Card.Img
                                    className="movie-img"
                                    variant="top"
                                    src={m.ImagePath}
                                />
                            </CardHeader>

                            <Card.Body>
                                <Card.Title>{m.Title}</Card.Title>
                            </Card.Body>

                            <Card.Footer>
                                <Col>
                                    <Button
                                        className="remove-fav-button"
                                        size="sm"
                                        type="button"
                                        onClick={() => removeFavourite(m._id)}
                                    >
                                        Remove
                                    </Button>

                                </Col>

                                <Col>
                                    {<Link
                                        className="movie-img"
                                        to={`/movies/${m._id}`}
                                    >
                                        <Button
                                            className="movie-view-button">
                                            Open
                                        </Button>
                                    </Link>}


                                </Col>

                            </Card.Footer>

                        </Card>
                    </Col>
                ))}
            </CardGroup>
            <Button
                className="back-button"
                variant="secondary"
                onClick={() => {
                    onBackClick();
                }}
            >
                Back
            </Button>

        </Container>
    );
}

/* ProfileView.propTypes = {
    favouriteMovies: PropTypes.array.isRequired,
}; */
