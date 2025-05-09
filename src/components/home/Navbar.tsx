import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { StyledSvg } from "./CurrentState";
import arrow from "../../assets/common/icons/arrow.svg";
import { Container } from "../common/Container";

export const NavBar = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdownClick = () => setDropdownOpen((open) => !open);
  const handleSeason4Click = () => {
    navigate("/season-4");
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <HeaderMainContainer>
      <Container>
        <ItemsContainer>
          <LogoContainer>
            <Link to="/">
              <img
                src="/images/argento-logo.png"
                height="48px"
                width="76px"
                style={{ objectFit: "contain", display: "block" }}
              />
            </Link>
          </LogoContainer>
          <LinkContainer>
            <HeaderLink to="/">Inicio</HeaderLink>
            <DropdownContainer ref={dropdownRef}>
              <DropdownButton
                onClick={handleDropdownClick}
                aria-expanded={dropdownOpen}
              >
                Ligas{" "}
                <span style={{ marginLeft: 6, fontSize: 14 }}>
                  <StyledSvg src={arrow} />
                </span>
              </DropdownButton>
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItemDisabled>Season 3</DropdownItemDisabled>
                  <DropdownItem onClick={handleSeason4Click}>
                    Season 4
                  </DropdownItem>
                </DropdownMenu>
              )}
            </DropdownContainer>
          </LinkContainer>
        </ItemsContainer>
      </Container>
    </HeaderMainContainer>
  );
};

const HeaderMainContainer = styled.div`
  height: 70px;
  background-color: #00334a;
`;

const ItemsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;

  @media (max-width: 720px) {
    justify-content: flex-end;
  }
`;

// Home/logo stays top-left
const LogoContainer = styled.div`
  position: absolute;
  left: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderLink = styled(Link)`
  display: flex;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  &:hover {
    background-color: #095b82;
    font-weight: 700;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownButton = styled.button`
  display: flex;
  padding: 8px 16px;
  border-radius: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #095b82;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 140px;
  background: #095b82;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  background: #095b82;
  transition: background 0.2s;
  &:hover {
    background: #00334a;
  }
`;

const DropdownItemDisabled = styled.div`
  padding: 12px 20px;
  color: #b0b0b0;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 700;
  background: #095b82;
  opacity: 0.6;
  cursor: not-allowed;
  user-select: none;
`;
