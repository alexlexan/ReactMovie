import React, { useState, useRef } from "react";
import FontAwesome from "react-fontawesome";

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from "../styles/StyledSearchBar";

type Props = {
  callback: (search: string) => void;
};

type Timeout = { current: ReturnType<typeof setTimeout> };

const SearchBar: React.FC<Props> = ({ callback }) => {
  const [state, setState] = useState("");
  const timeOut = useRef<any>(null);

  const doSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <FontAwesome className="fa-search" name="search" size="2x" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={doSearch}
          value={state}
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};

export default SearchBar;
