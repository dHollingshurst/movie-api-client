import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, ShowMore, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card >
                <Card.Img className='movie-img' variant="top" src="movie.ImagePath" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                </Card.Body>
                <Card.Footer className='card-footer'>
                    <Link
                        to={`/movies/${movie._id}`}
                    >
                        <Button
                            className="movie-view-button"
                            variant="primary"
                            size="sm"

                        >
                            Open
                        </Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
            Birth: PropTypes.string
        }),
        Actors: PropTypes.array
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};