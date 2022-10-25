import React from 'react';
import { CardGroup, Button, Card, Col, Row, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

// import './director-view.scss';
export class DirectorView extends React.Component {
    render() {
        const { movies, director, onBackClick } = this.props;

        return (
            <Row className="justify-content-center mt-3">
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {director.Name}
                            </Card.Title>
                            <Card.Text>
                                {director.Bio}
                            </Card.Text>

                            {/*     <Card.Text>
                                <Row className="justify-content-center mt-3">
                                    {directorMovies.map((movie) => (
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