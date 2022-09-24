import React from "react";
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src="{movie.ImagePath}" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <br />
                    <span className="label">    Name: </span>
                    <span className="value">{movie.Genre.Name}</span>
                    <br />
                    <span className="label">    Description: </span>
                    <span className="value">{movie.Genre.Description}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <br />
                    <span className="label">    Name: </span>
                    <span className="value">{movie.Director.Name}</span>
                    <br />
                    <span className="label">    Bio: </span>
                    <span className="value">{movie.Director.Bio}</span>
                </div>
                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movie.Actors}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}