import { createContext } from "react";
import { moviesObject } from "../../hooks/useHomeFetch";

type HomeState = {
  searchTerm: string;
  movies: moviesObject[];
  currentPage: number;
  totalPages: number;
  heroImage: {
    backdrop_path: string;
    original_title: string;
    overview: string;
  };
  loading: boolean;
  error: boolean;
  isResult: boolean;
  searchMovies: (search: string) => void;
  loadMoreMovies: () => void;
};

// @ts-ignore
export const HomeContext = createContext<HomeState>();
