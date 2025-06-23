import styled from "styled-components";
import SVG from "react-inlinesvg";

type SVGProps = {
  color?: string;
  width?: string;
  height?: string;
};

export const StyledSvg = styled(SVG)<SVGProps>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  & path {
    fill: ${({ color }) => color || "#FFFFFF"};
  }
`;