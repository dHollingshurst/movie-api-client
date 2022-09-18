import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    /* constructor is what allows a component to actually be visible to the user. also allows for code to be exectued at moment of rendering. eg having default values for something when it's initialized*/
    constructor() {
        super(); // super() is code that is executed as soon as the conponent is created in memeory. happens before rendering. gives class the features of parent React.Component. super() is mandatory whenever constructor() is used.
        this.state = {
            movies: [],
            selectedMovie: null
        };
    }

    componentDidMount() {
        axios.get('https://https://davemoviebase.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }
}

export default MainView;