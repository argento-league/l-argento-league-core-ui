import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/about", label: "Season 5" },
  { to: "/ligas-anteriores", label: "Ligas Anteriores" },
  { to: "/staff", label: "Staff" },
];

export const NavBar = () => {
  const isMobile = useIsMobile();
  return (
    <HeaderWrapper>
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
        {isMobile ? <BurgerMenu /> : <DesktopNavbarLinks />}
      </HeaderMainContainer>
    </HeaderWrapper>
  );
};

function DesktopNavbarLinks() {
  return (
    <DesktopLinkContainer>
      {NAV_LINKS.map((link) => (
        <HeaderLink key={link.to} to={link.to}>
          {link.label}
        </HeaderLink>
      ))}
    </DesktopLinkContainer>
  );
}

function MobileNavbarLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <MobileLinkContainer>
      {NAV_LINKS.map((link) => (
        <HeaderLink key={link.to} to={link.to} onClick={onNavigate}>
          {link.label}
        </HeaderLink>
      ))}
    </MobileLinkContainer>
  );
}

function BurgerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <BurgerButton onClick={handleDrawerOpen}>
        <span />
        <span />
        <span />
      </BurgerButton>
      <Drawer open={drawerOpen}>
        <DrawerHeader>
          <CloseButton onClick={handleDrawerClose}>&times;</CloseButton>
        </DrawerHeader>
        <MobileNavbarLinks onNavigate={handleDrawerClose} />
      </Drawer>
      {drawerOpen && <DrawerBackdrop onClick={handleDrawerClose} />}
    </>
  );
}

const HeaderWrapper = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  height: 70px;
`;

const HeaderMainContainer = styled.div`
  background-color: #000000;
  padding-right: 64px;
  padding-left: 64px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 720px) {
    padding-right: 32px;
    padding-left: 32px;
  }
`;

const LogoContainer = styled.div``;

const DesktopLinkContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MobileLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    background-color: #095b824d;
    font-weight: 700;
  }
`;

const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1201;
  span {
    display: block;
    height: 4px;
    width: 100%;
    background: #fff;
    border-radius: 2px;
    transition: 0.2s;
  }
`;

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 240px;
  background: #111;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  transform: translateX(${(props) => (props.open ? "0" : "100%")});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1202;
  display: flex;
  flex-direction: column;
  padding: 24px 16px 0 16px;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const DrawerBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1200;
`;
