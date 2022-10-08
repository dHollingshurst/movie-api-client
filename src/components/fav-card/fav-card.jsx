import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class FavCard extends Component {
    render() {
        const { movie, handleFavorite } = this.props;
        return (
            <div>
                <Row>
                    <Col >
                        <Card>
                            <Card.Img
                                src={movie.imageURL}
                            />
                            <Card.Body>
                                <p>{movie.title}</p>

                                <Button
                                    variant="primary"
                                    onClick={() => handleFavorite(movie._id, 'remove')}
                                >
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}

FavCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired,
};