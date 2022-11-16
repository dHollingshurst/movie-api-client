import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Switch from "react-switch";
import './movie-view.scss';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFavourite } from "../../actions/actions";



export class MovieView extends React.Component {



    render() {
        const { movie, onBackClick, addFavourite } = this.props;

        return (
            <Row>
                <Col className="movie-view-card" xs={12}>
                    <Card


                    >
                        <Card.Img className="poster-img" variant="top" src="movie.ImagePath" />
                        <Card.Body
                            className="movie-poster">
                            <Card.Title>
                                {movie.Title}
                            </Card.Title>
                            <Card.Text className="description-text">
                                Synopsis: {movie.Description} <br />
                                <br />
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Col>

                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button className="genre-button" variant="primary">Genre</Button>
                                </Link>
                            </Col>
                            <Col>

                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button className="director-button" variant="primary">Director</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button
                                    variant="primary"
                                    className="fav-button"
                                    type="button"
                                    onClick={() => addFavourite(movie._id)}
                                >
                                    Add to Favourites
                                </Button>
                            </Col>



                        </Card.Footer>
                    </Card >

                    <Button
                        variant="primary"
                        className="back-button"
                        onClick={() => { onBackClick(null); }}
                    >
                        Back
                    </Button>

                </Col>
            </Row>
        );
    }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    };
}
let mapDispatchToProps = (dispatch) => ({
    addFavourite: (event) =>
        dispatch(setFavourite(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieView);