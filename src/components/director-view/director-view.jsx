import React from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import "./director-view.scss";

export function DirectorView({ movies }) {

    const selectDirector = () => {
        const { name } = useParams();
        return movies.find((m) => m.director.name === name);
    }

    return (
        <Col md={8}>
            <Card className="director-view">
                <Card.Title>director</Card.Title>
                <Card.Subtitle>{selectDirector().director.name}</Card.Subtitle>
                <Card.Text>{selectDirector().director.bio}</Card.Text>
                <Link to={-1}>
                    <Button variant="SomeSCSSClass">Back</Button>
                </Link>
            </Card>
        </Col>
        );


    //return (
    //    <Row className="justify-content-center mt-3">
    //        <Col xs={12}>
    //            <Card>
    //                <Card.Body>
    //                    <Card.Title>
    //                        {director.Name}
    //                    </Card.Title>
    //
    //                    <Card.Text>
    //                        {director.Bio} <br />
    //                    </Card.Text>
    //
    //                    <Card.Text>
    //                        {director.Birth}
    //                    </Card.Text>
    //
    //                    {/*   <Card.Text>
    //                        <Row
    //                            className="justify-content-center mt-3">
    //                            {directorMovies.map((movie) => (
    //                                <MovieCard
    //                                    key={movie._id}
    //                                    movie={movie}>
    //                                    {movie.Title}
    //                                </MovieCard>
    //                            ))}
    //                        </Row>
    //                    </Card.Text> */}
    //
    //                    <Button
    //                        onClick={() => { onBackClick(null); }}>
    //                        Back
    //                    </Button>
    //                </Card.Body>
    //            </Card>
    //        </Col>
    //    </Row>
    //)
}

export default DirectorView;
