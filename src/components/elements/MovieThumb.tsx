import React from "react";
import { Link } from "react-router-dom";

import { StyledMovieThumb } from "../styles/StyledMovieThumb";

type Props = {
  image: string;
  movieId?: number;
  clickable: boolean;
};

const MovieThumb: React.FC<Props> = ({ image, movieId, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

export default MovieThumb;
