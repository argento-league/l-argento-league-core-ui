import styled from "styled-components";
import { CURRENT_SEASON_COLORS } from "../../../constants/season-colors";

export const TabsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(80, 255, 16, 0.2);
  padding-top: 16px;
  box-sizing: border-box;
  color: white;
  font-family: Outfit, sans-serif;
  display: flex;
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

type TabsProps = {
  selected?: boolean;
  disabled?: boolean;
};

export const Tabs = styled.div<TabsProps>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 16px 24px;
  width: 100%;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-weight: ${(props) => (props.selected ? "600" : "300")};
  color: ${({ disabled }) => (disabled ? "#666" : "white")};
  background-color: transparent;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: ${({ selected, disabled }) => 
    selected && !disabled
      ? "0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(138, 43, 226, 0.6)" 
      : "none"};
  
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.4 : 0.8)};
    text-shadow: ${({ disabled }) => 
      disabled ? "none" : "0 0 10px rgba(138, 43, 226, 0.6)"};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ selected }) => selected ? "100%" : "0%"};
    height: 3px;
    background: ${CURRENT_SEASON_COLORS.primary};
    transition: width 0.3s ease;
    box-shadow: 0 0 10px ${CURRENT_SEASON_COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 16px;
  }
`;