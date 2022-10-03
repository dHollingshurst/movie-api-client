import React from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {

        const { movie, movies, onBackClick, directors, director, directorMovies, MovieCard } = this.props;

        return (
            <Row className="justify-content-center mt-3">
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {director.Name}
                            </Card.Title>

                            <Card.Text>
                                {director.Bio} <br />
                            </Card.Text>

                            <Card.Text>
                                {director.Birth}
                            </Card.Text>

                            {/*   <Card.Text>
                                <Row
                                    className="justify-content-center mt-3">
                                    {directorMovies.map((movie) => (
                                        <MovieCard
                                            key={movie._id}
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