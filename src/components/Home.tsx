import React, { useContext } from "react";
import { HomeContext } from "./context/homeContext/homeContext";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// import Components
import HeroImage from "./elements/HeroImage";
import SearchBar from "./elements/SearchBar";
import Grid from "./elements/Grid";
import MovieThumb from "./elements/MovieThumb";
import LoadMoreBtn from "./elements/LoadMoreBtn";
import Spinner from "./elements/Spinner";

import NotFound from "./NotFound";
import NoImage from "./images/no_image.jpg";

const Home = () => {
  console.log(process.env);
  debugger;
  const {
    searchTerm,
    movies,
    isResult,
    currentPage,
    totalPages,
    heroImage,
    loading,
    error,
    searchMovies,
    loadMoreMovies,
  } = useContext(HomeContext);
  if (error) return <div>Something went wrong ...</div>;
  if (!movies[0] && isResult) return <Spinner />;

  return (
    <>
      {!searchTerm && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
          title={heroImage.original_title}
          text={heroImage.overview}
        />
      )}
      <SearchBar callback={searchMovies} />

      {isResult ? (
        <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
          {movies.map((movie, key) => (
            <MovieThumb
              key={movie.id + key}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
            />
          ))}
        </Grid>
      ) : (
        <NotFound />
      )}

      {loading && <Spinner />}
      {currentPage < totalPages && !loading && (
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      )}
    </>
  );
};

export default Home;
