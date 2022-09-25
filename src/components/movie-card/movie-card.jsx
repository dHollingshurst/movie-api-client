import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, ShowMore, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <div className='movieCard'>
                <Card border="dark" className='mb-3 main-card'>
                    <Card.Img className='movieImg' variant='top' src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text >{movie.Description}</Card.Text>
                        <Button className='card-button' onClick={() => onMovieClick(movie)}>Open</Button>
                    </Card.Body>
                    <Card.Footer>
                        <large>test</large>
                    </Card.Footer>

                </Card>

            </div>



            //<div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
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