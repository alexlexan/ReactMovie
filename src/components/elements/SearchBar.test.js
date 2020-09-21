import React from "react";
import SearchBar from "./SearchBar";
import { StyledSearchBar } from "../styles/StyledSearchBar";

const setUp = (props) => shallow(<SearchBar {...props} />);

describe("should render SearchBar component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  it("should render SearchBar component", () => {
    const SearchBar = component.find(StyledSearchBar);
    expect(SearchBar.length).toBe(1);
  });
});
