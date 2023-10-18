import { Genre, Movie } from '@/types/movie';
import styles from './cardMovie.module.css';
import React from 'react';
import DeleteMovie from '../buttons/movies_buttons/DeleteMovie';
import UpdateMovieBtn from '../buttons/movies_buttons/UpdateMovieBtn';
import AddGenreMovieBtn from '../buttons/movies_buttons/AddGenreMovie';
import DeleteGenre from '../buttons/genre_button/DeleteGenre';

type Props = {
    movie: Movie[];
    isDisabled?: boolean;
    onActionSuccess: () => void;
};

const CardMovie = ({ movie, isDisabled }: Props) => {
    console.log(movie);
    return (
        <>
            {Array.isArray(movie) ? (
                movie.map((singleMovie) => (
                    <div key={singleMovie.id} className={styles.div_container}>
                        <div className={styles.left_content}>
                            <img src={singleMovie.url} alt={singleMovie.name} className={styles.movie_image} />
                        </div>
                        <div className={styles.right_content}>
                            <h2 className={styles.movie_name}>{singleMovie.name}</h2>
                            <p className={styles.description}>
                                {singleMovie.description}
                            </p>

                            <div className={styles.genre_score}>
                                <div className={styles.genres}>
                                    {singleMovie.genres?.slice(0, 2).map((genre: Genre, index: number, array: Genre[]) => (
                                        <span key={genre.name} className={styles.genre}>
                                            {genre.name}
                                            {index < array.length - 1 ? ', ' : ''}
                                            <DeleteGenre genreId={genre.id} />
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.score}>
                                    {singleMovie.score !== undefined ? `${singleMovie.score} / 10` : 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <AddGenreMovieBtn movieId={singleMovie.id} isDisabled={isDisabled || (singleMovie.genres?.length || 0) >= 3} />
                            <UpdateMovieBtn movieId={singleMovie.id} />
                            <DeleteMovie movieId={singleMovie.id} />
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
