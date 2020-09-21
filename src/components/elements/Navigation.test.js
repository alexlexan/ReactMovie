import React from "react";
import Navigation from "./Navigation";

const setUp = (props) => shallow(<Navigation {...props} />);

describe("should render Navigation component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should render Navigation component", () => {
    const Navigation = component.find(".navigation-content");
    expect(Navigation.length).toBe(1);
  });

  it("should render Navigation component props", () => {
    const comp = shallow(<Navigation />);
    expect(comp).toMatchSnapshot();
  });

  it("should render Navigation component with default props", () => {
    const comp = shallow(<Navigation movie="Default value" />);
    expect(comp).toMatchSnapshot();
  });
});
