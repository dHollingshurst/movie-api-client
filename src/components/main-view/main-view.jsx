import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Navbar, Nav, Button, Card, CardGroup } from 'react-bootstrap';


import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

export class MainView extends React.Component {

    /* constructor is what allows a component to actually be visible to the user. also allows for code to be exectued at moment of rendering. eg having default values for something when it's initialized*/
    constructor() {
        super(); // super() is code that is executed as soon as the conponent is created in memeory. happens before rendering. gives class the features of parent React.Component. super() is mandatory whenever constructor() is used.
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }

    componentDidMount() {
        axios.get('https://davemoviebase.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*When a movie is clicked, this funciton is invoked and updates the state of the 'selectedMovie' property to that movie*/

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* when a user succesfullly logs in, this function updates the 'user' property in state to that particular user */

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    // when a user succesfully registers

    onRegister(registered) {

        this.setState({
            registered
        });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        /* if there is no user, the LoginView is rendered. if there is a user logged in, the user details are passed as a prop to the LoginView */
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // if the user is not registered
        if (!registered) return <RegistrationView onRegister={registered => this.onRegister(registered)} />;

        // before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className='main-view'>
                <Navbar className="mb-5" bg="dark" expand="lg" variant="dark">

                    <Container fluid>

                        <Navbar.Brand href="index.html">My-Flix</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                <Container>

                    <Row className="main-view justify-content-md-center">
                        {selectedMovie
                            ? (
                                <Col className='' md={8} sm={12}>
                                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            )
                            : movies.map(movie => (

                                <Col sm={12} md={8} lg={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>

            </div>
        );
    }
}

export default MainView;