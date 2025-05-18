# Movie Management Application

## Overview

This project is a **Movie Management** application built using **Spring Boot** for the backend, **Angular 16+** for the frontend, and **MySQL** as the database, running in a **Docker** container. The application allows users to view, rate, and search for movies, while admins can fetch movies from an external API (OMDB API), add them to the database, and manage user access based on roles.

---

##  Preview

![App Screenshot](https://github.com/JihadWael099/Movies-Management-System/blob/main/20250518_220032-ezgif.com-video-to-gif-converter.gif)


## Features

### Admin Dashboard:
- **Movie Management**: Admin users can fetch movies from the OMDB API using a movie title, and add them to the database.
- **Search Functionality**: Admins can search for movies  from the the OMDB API.
- **Movie CRUD Operations**: Admins have full control to add, and delete movie records from the system.
  
### User Dashboard:
- **View Movies**: Regular users can view a list of all movies fetched from the backend database.
- **Rate Movies**: Users can rate movies, and the ratings will be stored in the database.
- **Search Movies**: Users can search for movies based on title.

### Authentication and Role-Based Access:
- **Login**: Users can log in using their credentials, and the system supports role-based access.
  - **Admin**: Can access the admin dashboard and perform CRUD operations on movies.
  - **Regular User**: Can only view and rate movies.
- **Registration**: New users can register with a username, email, and password.

### Technologies Used:
- **Backend**: Spring Boot
- **Frontend**: Angular 16+
- **Database**: MySQL (running in Docker)
- **External API**: OMDB API for fetching movie details.
- **Authentication**: JWT-based token authentication for secure login.
- **Docker**: MySQL database is run using Docker for easy deployment.

---

## Backend (Spring Boot)

The Spring Boot backend handles API endpoints for movie management, user authentication, and role-based authorization.

### Key Endpoints:

1. **POST /api/auth/register**: **Registers a new user.**  
2. **POST /api/auth/login**: **Logs in a user and returns a JWT token.**  
3. **GET /api/v1/movies**: **Retrieves a paginated list of all movies.**  
4. **GET /api/v1/movies/id?id={movieId}**: **Fetches a specific movie by ID using a query parameter.**  
5. **GET /api/v1/movies/search?title={title}**: **Searches for movies by title.**  
6. **POST /api/v1/movies/add**: **Adds a new movie to the database (only accessible by admins).**  
7. **DELETE /api/v1/movies/{id}**: **Deletes a movie from the database (only accessible by admins).**  
8. **POST /api/v1/movies/batch-add**: **Adds a list of movies in bulk (only accessible by admins).**  
9. **DELETE /api/v1/movies/batch-remove**: **Deletes multiple movie

### OMDB API Integration:
- Admin users can search for movies using the **OMDB API** by providing the movie title, which returns movie details such as title, actors, ratings, etc.
- Admins can add the retrieved movie details to the database.

### Role-Based Access:
- The system uses JWT tokens for secure login and role-based access.
  - **Admin**: Can perform CRUD operations on movies and access the admin dashboard.
  - **User**: Can only view movies and rate them.

---

## Frontend (Angular)

The frontend is developed using **Angular 16+** and provides a user-friendly interface for interacting with the backend API.

### Features:

- **Login & Registration**: A login page allows users to sign in using their credentials, while a registration page enables users to sign up.
- **Admin Dashboard**: Only accessible by users with the **Admin** role, where admins can fetch movies from OMDB, add new movies, and perform CRUD operations.
- **User Dashboard**: Regular users can view movie details, search for movies, and rate them.
- **Role-Based UI Rendering**: Buttons and options are displayed conditionally based on the user’s role. Admins can see the options to add and delete movies, while regular users can only view and rate movies.

## API Testing with Postman

To test the API endpoints, you can use the following **Postman collection** link. It contains all the necessary requests for interacting with the backend, including authentication, movie management, and more.

- **Postman Collection**: [Movie Management API Collection]()
