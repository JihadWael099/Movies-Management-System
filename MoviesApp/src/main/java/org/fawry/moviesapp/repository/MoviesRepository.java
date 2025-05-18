package org.fawry.moviesapp.repository;
import org.fawry.moviesapp.entity.Movies;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
public interface MoviesRepository extends JpaRepository<Movies,String> {
    Optional<Movies> findById(String id);
    Optional<Movies>findByTitle(String title);
    void deleteAllById(String id);
    List<Movies> findAllByTitle(String title);
    Page<Movies> findAll(Pageable pageable);
}
