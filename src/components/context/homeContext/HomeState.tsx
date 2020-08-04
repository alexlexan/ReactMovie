import React, { useState } from "react";
import { HomeContext } from "./homeContext";
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "../../../config";

// Custom Hook
import { useHomeFetch } from "../../hooks/useHomeFetch";

type Props = {
  children: React.ReactNode;
};

export const HomeState: React.FC<Props> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchData, fetchMovies] = useHomeFetch(searchTerm);

  const {
    state: { movies, currentPage, totalPages, heroImage },
    loading,
    error,
    isResult,
  } = fetchData;

  const searchMovies = (search: string) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    const searchEndpoint = `
      ${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}
    `;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

    fetchMovies(endpoint);
  };

  return (
    <HomeContext.Provider
      value={{
        searchTerm,
        movies,
        currentPage,
        totalPages,
        heroImage,
        loading,
        error,
        isResult,
        searchMovies,
        loadMoreMovies,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
