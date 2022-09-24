import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    /* constructor is what allows a component to actually be visible to the user. also allows for code to be exectued at moment of rendering. eg having default values for something when it's initialized*/
    constructor() {
        super(); // super() is code that is executed as soon as the conponent is created in memeory. happens before rendering. gives class the features of parent React.Component. super() is mandatory whenever constructor() is used.
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://davemoviebase.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*When a movie is clicked, this funciton is invoked and updates the state of the 'selectedMovie' property to that movie*/

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* when a user succesfullly logs in, this function updates the 'user' property in state to that particular user */

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* if there is no user, the LoginView is rendered. if there is a user logged in, the user details are passed as a prop to the LoginView */
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {/*if the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise all movies will be returned. 
            ask mentor about this block and reactDom.render vs createRoot error in console   */}
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