import React from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import './movie-view.scss';

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
                                Genre: {movie.Genre.Name} <br />
                                {movie.Genre.Description} <br />
                                <br />
                                Director: {movie.Director.Name} <br />
                                {movie.Director.Bio} <br />
                                <br />
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