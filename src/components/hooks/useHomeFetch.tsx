import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";

export type moviesObject = {
  poster_path: string;
  id: number;
  original_title: string;
};

type State = {
  movies: moviesObject[];
  currentPage: number;
  totalPages: number;
  heroImage: {
    backdrop_path: string;
    original_title: string;
    overview: string;
  };
};

type StateFetch = {
  state: State;
  loading: boolean;
  error: boolean;
  isResult: boolean;
};

type Fetch = (endpoint: string) => Promise<void>;

type Result = [StateFetch, Fetch];

export const useHomeFetch = (searchTerm: string): Result => {
  const initialState = { movies: [] };
  const [state, setState] = useState((initialState as unknown) as State);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isResult, setResult] = useState(true);

  const fetchMovies = async (endpoint: string) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search("page");

    try {
      const result = await (await fetch(endpoint)).json();

      if (!result.results.length) setResult(false);
      else setResult(true);

      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  // Fetch popular movies initially on mount
  useEffect(() => {
    if (sessionStorage.homeState) {
      setState(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      fetchMovies(POPULAR_BASE_URL);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return [{ state, loading, error, isResult }, fetchMovies];
};
