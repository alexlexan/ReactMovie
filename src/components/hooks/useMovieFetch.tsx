import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

type stateMovie = {
  original_title: string;
  runtime: number;
  budget: number;
  revenue: number;
  actors: Actor[];
  title: string;
  overview: string;
  vote_average: string;
  directors: Directors[];
  poster_path: string;
  backdrop_path: string;
};

type Directors = {
  credit_id: number;
  name: string;
};

type Actor = {
  profile_path: string;
  name: string;
  character: string;
  credit_id: string;
};
type Result = [stateMovie, boolean, boolean];

export const useMovieFetch = (movieId: string): Result => {
  const initialState = {};
  const [state, setState] = useState(initialState as stateMovie);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
      const result: stateMovie = await (await fetch(endpoint)).json();

      const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      const creditsResult = await (await fetch(creditsEndpoint)).json();
      const directors = creditsResult.crew.filter(
        (member: { job: string }) => member.job === "Director"
      );

      setState({
        ...result,
        actors: creditsResult.cast,
        directors,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    if (localStorage[movieId]) {
      setState(JSON.parse(localStorage[movieId]));
      setLoading(false);
    } else {
      fetchData();
    }
  }, [fetchData, movieId]);

  useEffect(() => {
    localStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return [state, loading, error];
};
