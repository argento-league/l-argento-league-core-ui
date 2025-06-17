import styled from "styled-components";

export interface BoxProps {
  backgroundColor?: string;
  col?: string;
  row?: string;
  colTablet?: string;
  rowTablet?: string;
  colMobile?: string;
  rowMobile?: string;
}

export const GridBox = styled.div<BoxProps>`
  background-color: ${(props) => props.backgroundColor || "black"};
  color: white;
  border-radius: 8px;

  /* Desktop */
  grid-column: ${(props) => props.col || "1 / 6"};
  grid-row: ${(props) => props.row || "1 / 3"};

  /* Tablet */
  @media (max-width: 1024px) {
    grid-column: ${(props) => props.colTablet || "1 / 6"};
    grid-row: ${(props) => props.rowTablet || "1 / 3"};
  }
`;
