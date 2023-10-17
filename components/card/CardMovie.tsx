import { Genre, Movie } from '@/types/movie';
import styles from './cardMovie.module.css';
import React from 'react';
import DeleteMovie from '../buttons/movies_buttons/DeleteMovie';
import UpdateMovieBtn from '../buttons/movies_buttons/UpdateMovieBtn';
import AddGenreMovieBtn from '../buttons/movies_buttons/AddGenreMovie';
import DeleteGenre from '../buttons/genre_button/DeleteGenre';

type Props = {
    movie: Movie;
    isDisabled?: boolean;
};

const CardMovie = ({ movie, isDisabled }: Props) => {
    return (
        <>
            {Array.isArray(movie) ? (
                movie.map((movie) => (
                    <div key={movie.id} className={styles.div_container}>
                        <div className={styles.left_content}>
                            <img src={movie.url} alt={movie.name} className={styles.movie_image} />
                        </div>
                        <div className={styles.right_content}>
                            <h2 className={styles.movie_name}>{movie.name}</h2>
                            <p className={styles.description}>
                                A young man dies in a hit-and-run accident. The guilty driver has left no traces and there are no evidences against him. But the young man’s father, with the support of the media, demands that person.
                                {movie.description}
                            </p>
                            <div className={styles.genre_score}>
                                <div className={styles.genres}>
                                    {movie.genres?.slice(0, 2).map((genre: Genre, index: number, array: Genre[]) => (
                                        <span key={genre.name} className={styles.genre}>
                                            {genre.name}
                                            {index < array.length - 1 ? ', ' : ''}
                                            <DeleteGenre genreId={genre.id} />
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.score}>
                                    {movie.score !== undefined ? `${movie.score} / 10` : 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <AddGenreMovieBtn movieId={movie.id} isDisabled={isDisabled || (movie.genres?.length || 0) >= 3} />
                            <UpdateMovieBtn movieId={movie.id} />
                            <DeleteMovie movieId={movie.id} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </>
    );
};

export default CardMovie;
