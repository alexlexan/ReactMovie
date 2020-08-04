import React from "react";

import { StyledLoadMoreBtn } from "../styles/StyledLoadMoreBtn";

type Props = {
  text: string;
  callback: (e?: React.MouseEvent) => void;
};

const LoadMoreBtn: React.FC<Props> = ({ text, callback }) => (
  <StyledLoadMoreBtn type="button" onClick={callback}>
    {text}
  </StyledLoadMoreBtn>
);

export default LoadMoreBtn;
