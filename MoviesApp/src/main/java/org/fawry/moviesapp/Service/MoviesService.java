package org.fawry.moviesapp.Service;
import org.fawry.moviesapp.Exceptions.ConflictDataException;
import org.fawry.moviesapp.Exceptions.NotFoundException;
import org.fawry.moviesapp.entity.Movies;
import org.fawry.moviesapp.repository.MoviesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
@Service
public class MoviesService {
    private final MoviesRepository moviesRepository;

    public MoviesService(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    public List<Movies> getMovieByTitle(String t) {
        List<Movies> movieByTitle = moviesRepository.findAllByTitle(t);
        movieByTitle.sort(null);
        if(!movieByTitle.isEmpty())return movieByTitle ;
        throw new NotFoundException("not found");
    }
    public Movies getMovieDetailsById(String imdbId) {
        return moviesRepository
                .findById(imdbId).orElseThrow(()->
                        new NotFoundException("movie nor found"));
    }
    public Movies addMovie(Movies movie) {
        Optional<Movies> movieById = moviesRepository.findById(movie.getImdbID());
        Optional<Movies> movieByTitle = moviesRepository.findByTitle(movie.getTitle());
        movieById.ifPresent(existingMovie -> {
            throw new ConflictDataException("Movie already exists by ID!");
        });
        movieByTitle.ifPresent(existingMovie -> {
            throw new ConflictDataException("Movie already exists by Title!");
        });
        return moviesRepository.save(movie);
    }

    public String deleteMovie(String id) {
        Movies movie = moviesRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Movie not found!"));
        moviesRepository.deleteById(id);
        return "Deleted";
    }

    public Page<Movies> getAllMovies(int page , int size){

        Pageable pageable = PageRequest.of(page,size);
        return moviesRepository.findAll(pageable);
    }

    public List<Movies> addMoviesBatch(List<Movies> movies) {
        return moviesRepository.saveAll(movies);
    }

    public void removeMoviesBatch(List<String> movieIds) {
        moviesRepository.deleteAllById(movieIds);
    }
}
