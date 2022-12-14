export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_FAVOURITE = 'SET_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const UPDATE_USER = 'UPDATE_USER';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}

export function setFavourite(value) {
    return { type: SET_FAVOURITE, value };
}

export function deleteFavourite(value) {
    return { type: DELETE_FAVOURITE, value };
}
export function updateUser(value) {
    return { type: UPDATE_USER, value };
}