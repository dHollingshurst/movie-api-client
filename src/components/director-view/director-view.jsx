import React from 'react';
import { CardGroup, Button, Card, Col, Row, Card } from 'react-bootstrap';
import './director-view.scss';

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