import styled from "styled-components";
import { CURRENT_SEASON_COLORS } from "../../../constants/season-colors";

export const TabsContainer = styled.div`
  background-color: #090909;
  padding-top: 16px;
  box-sizing: border-box;
  color: white;
  font-family: Outfit, sans-serif;
  display: flex;
  overflow-x: auto;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

type TabsProps = {
  selected?: boolean;
  disabled?: boolean;
};

export const Tabs = styled.div<TabsProps>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  display: flex;
  fontsize: 14px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 16px;
  width: 100%;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-weight: ${(props) => (props.selected ? "600" : "300")};
  color: ${({ disabled }) => (disabled ? "#666" : "white")};
  background-color: transparent;
  ${(props) => (props.selected ? `border-bottom: 1px solid ${CURRENT_SEASON_COLORS.primary};` : "")};
  transition: opacity 0.2s ease, color 0.2s ease;
  
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.4 : 0.8)};
  }
`;