import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div style={{ gap: "16px", display: "flex", flexDirection: "column", height: "70px" }}>
      <HeaderMainContainer>
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
            <HeaderLink to="/about">Season 5</HeaderLink>
            <HeaderLink to="/ligas-anteriores">Ligas Anteriores</HeaderLink>
            <HeaderLink to="/staff">Staff</HeaderLink>
          </LinkContainer>
      </HeaderMainContainer>
    </div>
  );
};

const HeaderMainContainer = styled.div`
  background-color: #000000;
  padding-right: 64px;
  padding-left: 64px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 720px) {
    justify-content: flex-end;
  }
`;

// Home/logo stays top-left
const LogoContainer = styled.div``;

const LinkContainer = styled.div`
  display: flex;
  gap: 8px;
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
    background-color: #095B824D;
    font-weight: 700;
  }
`;
