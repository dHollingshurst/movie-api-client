import React from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Card } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {

        const { movies, onBackClick, genre, genreMovies } = this.props;

        return (
            <Row className="justify-content-center mt-3">
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {genre.Name}
                            </Card.Title>
                            <Card.Text>
                                {genre.Description}
                            </Card.Text>

                            {/*     <Card.Text>
                                <Row className="justify-content-center mt-3">
                                    {genreMovies.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}>
                                            {movie.Title}
                                        </MovieCard>
                                    ))}
                                </Row>
                            </Card.Text> */}

                            <Button
                                onClick={() => { onBackClick(null); }}>
                                Back
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}