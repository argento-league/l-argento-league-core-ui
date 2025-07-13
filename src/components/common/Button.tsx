import { Link } from "react-router-dom";
import styled from "styled-components";

export type ButtonProps = {
  backgroundColor?: string;
  color?: string;
};

export const Button = styled(Link)<ButtonProps>`
  font-family: "Outfit", sans-serif;
  text-decoration: none;
  color: ${(props) => props.color || "#000000"};
  background-color: ${(props) => props.backgroundColor || "#000000"};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  justify-content: center;
  display: flex;
  text-align: center;
`;