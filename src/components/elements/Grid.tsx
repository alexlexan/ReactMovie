import React from "react";
import { StyledGrid, StyledGridContent } from "../styles/StyledGrid";

type Props = {
  header: string;
  children: React.ReactNode;
};

const Grid: React.FC<Props> = ({ header, children }) => (
  <StyledGrid>
    <h1>{header}</h1>
    <StyledGridContent>{children}</StyledGridContent>
  </StyledGrid>
);

export default Grid;
