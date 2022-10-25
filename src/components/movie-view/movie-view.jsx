import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import Switch from "react-switch";
import './movie-view.scss';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link, Switch } from 'react-router-dom';



export class MovieView extends React.Component {



    render() {
        const { movie, onBackClick, addFavourite } = this.props;

        return (
            <Row>
                <Col xs={12}>
                    <Card className="movie-view-card">
                        <Card.Img className="poster-img" variant="top" src="movie.ImagePath" />
                        <Card.Body className="movie-poster">
                            <Card.Title>
                                {movie.Title}
                            </Card.Title>
                            <Card.Text>
                                Synopsis: {movie.Description} <br />
                                <br />
                            </Card.Text>

                            <Card.Text>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre</Button>
                                </Link>
                            </Card.Text>

                            <Card.Text>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="dark">Director</Button>
                                </Link>
                            </Card.Text>

                            <Button
                                variant="dark"
                                className="back-button"
                                onClick={() => { onBackClick(null); }}
                            >
                                Back
                            </Button>

                            <Button
                                variant="dark"
                                className="fav-button"
                                type="button"
                                onClick={() => addFavourite(movie._id)}
                            >
                                Add to Favourites
                            </Button>

                        </Card.Body>
                    </Card >

                </Col>
            </Row>
        );
    }
}
MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Actors: PropTypes.array.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }).isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};