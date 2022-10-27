import React from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import './genre-view.scss';

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
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                className='back-button'
                                onClick={() => { onBackClick(null); }}
                            >
                                Back
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
}