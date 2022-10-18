import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';



import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import { Container, Row, Col, Navbar, Nav, Button, Card, CardGroup } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

    /* constructor is what allows a component to actually be visible to the user. also allows for code to be exectued at moment of rendering. eg having default values for something when it's initialized*/
    constructor() {
        super(); // super() is code that is executed as soon as the conponent is created in memeory. happens before rendering. gives class the features of parent React.Component. super() is mandatory whenever constructor() is used.
        this.state = {
            movies: [],
            user: null,
            FavouriteMovies: [],

        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://davemoviebase.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getFavourites(token) {
        axios.get(`https://davemoviebase.herokuapp.com/users/${user}/movies/${movieId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                console.log(FavouriteMovies)
                this.setState({
                    FavouriteMovies: response.data

                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    addFavourite(movieId) {
        const { user, FavouriteMovies } = this.state;
        const token = localStorage.getItem('token');
        if (FavouriteMovies.some((favId) => favId === movieId)) {
            console.log('Movie already added to Favourites!');
        } else {
            if (token !== null && user !== null) {
                this.setState({
                    FavouriteMovies: [...FavouriteMovies, movieId],
                });
                axios
                    .post(
                        `https://davemoviebase.herokuapp.com/users/${user}/movies/${movieId}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((res) => {
                        console.log(`Movie successfully added to Favourites!`);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        }
    }

    removeFavourite(movieId) {
        const { user, FavouriteMovies } = this.state;
        const token = localStorage.getItem('token');
        if (token !== null && user !== null) {
            this.setState({
                FavouriteMovies: FavouriteMovies.filter((movie) => movie !== movieId),
            });
            axios
                .delete(
                    `https://davemoviebase.herokuapp.com/users/${user}/movies/${movieId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(() => {
                    console.log(`Movie successfully removed from Favourites!`);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }


    render() {
        const { movies, user, FavouriteMovies } = this.state;
        console.log(FavouriteMovies);

        return (
            <Router>
                <Menubar user={user} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route
                            exact path="/"
                            render={() => {
                                if (!user) return (
                                    <Col>
                                        <LoginView
                                            movies={movies}
                                            onLoggedIn={user => this.onLoggedIn(user)}
                                        />
                                    </Col>
                                );
                                // before the movies have been loaded
                                if (movies.length === 0) return <div className="main-view" />

                                return movies.map(m => (
                                    <Col md={3} key={m._id}>
                                        <MovieCard movie={m} />
                                    </Col>
                                ))
                            }} />

                        <Route
                            path="/register"
                            render={() => {
                                if (user)
                                    return <Redirect to="/" />
                                return <Col lg={8} md={8}>
                                    <RegistrationView />
                                </Col>
                            }} />

                        <Route
                            path="/movies/:movieId"
                            render={({ match, history }) => {
                                if (!user) return
                                <Col>
                                    <LoginView
                                        onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0)
                                    return <div className="main-view"
                                    />;
                                return (<Col md={8}>
                                    <MovieView
                                        movie={movies.find((m) => m._id === match.params.movieId)}
                                        addFavourite={this.addFavourite.bind(this)}
                                        onBackClick={() => history.goBack()}

                                    />
                                </Col>);
                            }} />

                        <Route
                            path="/directors/:Name"
                            render={({ match, history }) => {
                                if (!user) return
                                <Col>
                                    <LoginView
                                        onLoggedIn={user => this.onLoggedIn(user)}
                                    />
                                </Col>
                                if (movies.length === 0)
                                    return
                                <div className="main-view" />;
                                return <Col md={8}>
                                    <DirectorView
                                        director={movies.find(m => m.Director.Name === match.params.Name).Director
                                        }
                                        directorMovies={movies.filter(
                                            (m) => m.Director.Name === match.params.Name
                                        )} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                        <Route
                            path="/genres/:Name"
                            render={({ match, history }) => {
                                if (!user) return
                                <Col>
                                    <LoginView
                                        onLoggedIn={user => this.onLoggedIn(user)}
                                    />
                                </Col>
                                if (movies.length === 0)
                                    return <div className="main-view" />;
                                return (<Col md={8}>
                                    <GenreView
                                        genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>);
                            }} />

                        <Route
                            path="/users/:Username"
                            render={({ history }) => {
                                if (!user) return
                                <Col>
                                    <Redirect to="/" />
                                </Col>

                                if (movies.length === 0) return <div className="main-view" />;

                                if (!user) return <Redirect to="/" />;
                                return (
                                    <Col>
                                        <ProfileView
                                            FavouriteMovies={FavouriteMovies.map((movieId) => {
                                                return movies.find((m) => m._id === movieId);
                                            })}
                                            user={user}
                                            removeFavourite={this.removeFavourite.bind(this)}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />

                    </Row>
                </Container>
            </Router>
        );
    }
}


export default MainView;