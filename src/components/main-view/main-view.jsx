import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import { Container, Row, Col, Navbar, Nav, Button, Card, CardGroup } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {

    /* constructor is what allows a component to actually be visible to the user. also allows for code to be exectued at moment of rendering. eg having default values for something when it's initialized*/
    constructor() {
        super();
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.props.setUser(authData.user);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://davemoviebase.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        const user = localStorage.getItem('user');
        axios.get(`https://davemoviebase.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
            })
            .catch(error => {
                console.log(error.response);
            });
    }



    addFavourite(movieId) {

        let user = this.props.user;
        let username = this.props.user.Username;
        let favouriteMovies = this.props.user.FavouriteMovies;
        const token = localStorage.getItem('token');
        if (favouriteMovies.includes(movieId)) {
            console.log('Movie already added to Favourites!');
            alert('Movie already added to favourites')
        } else {
            if (token !== null && user !== null) {

                axios
                    .post(
                        `https://davemoviebase.herokuapp.com/users/${username}/movies/${movieId}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {

                        this.props.setUser({
                            FavouriteMovies: [...favouriteMovies, movieId],
                        });

                        console.log(`Movie successfully added to Favourites!`);
                        alert('Movie succesfully added to favourites');
                        window.open(`/movies/${movieId}`, "_self");
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        }
    }

    removeFavourite(movieId) {
        let user = this.props.user;
        let username = this.props.user.Username;
        let favouriteMovies = this.props.user.FavouriteMovies;
        const token = localStorage.getItem('token');
        if (token !== null && user !== null) {

            axios
                .delete(
                    `https://davemoviebase.herokuapp.com/users/${username}/movies/${movieId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then(response => {
                    favouriteMovies = favouriteMovies.filter((movie) => movie !== movieId);
                    this.props.setUser({
                        FavouriteMovies: favouriteMovies,
                    });
                    window.open(`/users/${username}`, "_self");
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }


    render() {
        let { movies } = this.props;
        let { user } = this.props;
        let userName = this.props.user.Username;


        return (
            <Router>
                <Menubar user={userName} />
                {/* <Container> */}
                <Row className="main-view justify-content-md-center">
                    <Route
                        exact path="/"
                        render={() => {
                            if (!userName) return (
                                <Col>
                                    <LoginView
                                        onLoggedIn={userName => this.onLoggedIn(userName)} // check here if sonething breaks
                                    />
                                </Col>
                            );
                            // before the movies have been loaded
                            if (movies.length === 0) return <div className="main-view" />;
                            return <MoviesList movies={movies} />;
                        }} />

                    <Route
                        path="/register"
                        render={() => {
                            if (userName)
                                return <Redirect to="/" />
                            return <Col lg={8} md={8}>
                                <RegistrationView />
                            </Col>
                        }} />

                    <Route
                        path="/movies/:movieId"
                        render={({ match, history }) => {
                            if (!userName) return
                            <Col>
                                <LoginView // same as above
                                    onLoggedIn={userName => this.onLoggedIn(userName)} />
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
                            if (!userName) return
                            <Col>
                                <LoginView
                                    onLoggedIn={userName => this.onLoggedIn(userName)}
                                />
                            </Col>
                            if (movies.length === 0)
                                return <div className="main-view" />;
                            return (<Col md={8}>
                                <DirectorView
                                    director={movies.find(m => m.Director.Name === match.params.Name).Director}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>);
                        }} />

                    <Route
                        path="/genres/:Name"
                        render={({ match, history }) => {
                            if (!userName) return
                            <Col>
                                <LoginView
                                    onLoggedIn={userName => this.onLoggedIn(userName)}
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
                            if (!userName) return
                            <Col>
                                <Redirect to="/" />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            if (!userName) return <Redirect to="/" />;
                            return (
                                <Col>
                                    <ProfileView
                                        movies={movies}
                                        user={user}
                                        removeFavourite={this.removeFavourite.bind(this)}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);