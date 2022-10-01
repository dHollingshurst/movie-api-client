import React from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Row>
                <Col xs={12}>
                    <Card>
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
                                    <Button variant="link">Director</Button>
                                </Link>
                            </Card.Text>

                            <Card.Text>
                                Actors: {movie.Actors}
                            </Card.Text>

                            <Button onClick={() => { onBackClick(null); }}>Back</Button>
                        </Card.Body>
                    </Card >

                </Col>
            </Row>
        );
    }
}