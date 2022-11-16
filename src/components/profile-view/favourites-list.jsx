import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { favouriteMovies } = state;
    return { favouriteMovies };
};

function FavouritesList(props) {
    const { favouriteMovies, user, movies } = props;
    let favourites = movies;

    if (favouriteMovies !== '') {
        favourites = movies.filter(m => m.Title.includes(user.FavouriteMovies.Title));
    }

    if (!movies) return <div className='main-view' />

    return <>
        {favourites.map(m => (
            <Col md={3} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))}
    </>;

}

export default connect(mapStateToProps)(FavouritesList);