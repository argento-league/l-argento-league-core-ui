import styled from "styled-components";
import {
  INFORMATION,
  INFORMATION_ENUM,
} from "../../../constants/current-season/information";
import { useState } from "react";

export const ContentListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

export const ContentText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

export const ContentTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const ContentContainer = styled.div`
  padding: 24px;
  border: 1px solid #ff611d;
  border-radius: 16px;
  font-family: Rethink Sans, sans-serif;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

type MenuItemContainerProps = {
  isSelected: boolean;
  hasBorder?: boolean;
};

const MenuItemContainer = styled.div<MenuItemContainerProps>`
  padding: 16px;
  background-color: ${(props) => (props.isSelected ? "#FABF4A33" : "black")};
  border: ${(props) => (props.hasBorder ? "1px solid #FF611D" : "none")};
  color: "white";
  border-radius: 16px;
  cursor: pointer;
  font-family: Outfit, sans-serif;
  font-size: 18px;
  font-weight: 600;
`;

const InfoGeneralContainer = styled.div`
  min-height: 300px;
  padding: 64px;
  gap: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;

const MenuContainer = styled.div`
  max-width: 384px;
  width: 100%;
`;

export const InfoTabContent = () => {
  const [selectedSubject, setSelectedSubject] = useState<INFORMATION_ENUM>(
    INFORMATION_ENUM.ARMADO_DE_EQUIPO
  );

  return (
    <InfoGeneralContainer>
      <MenuContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.ARMADO_DE_EQUIPO}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.ARMADO_DE_EQUIPO)}
        >
          <span>Armado de equipos</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.CAPITANES}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.CAPITANES)}
        >
          <span>Capitanes</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.CUENTAS_DE_STEAM}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.CUENTAS_DE_STEAM)}
        >
          <span>Cuentas de Steam</span>
        </MenuItemContainer>
        <MenuItemContainer
          isSelected={selectedSubject === INFORMATION_ENUM.FECHAS_DE_JUEGO}
          onClick={() => setSelectedSubject(INFORMATION_ENUM.FECHAS_DE_JUEGO)}
        >
          <span>Fechas de juego</span>
        </MenuItemContainer>
      </MenuContainer>
      <div style={{ width: "100%" }}>
        <ContentContainer>
          <ContentTitle>{INFORMATION[selectedSubject].title}</ContentTitle>
          {INFORMATION[selectedSubject].description?.length > 1 ? (
            INFORMATION[selectedSubject].description.map((el) => (
              <ContentListItem key={el}>{el}</ContentListItem>
            ))
          ) : (
            <ContentText>
              {INFORMATION[selectedSubject].description}
            </ContentText>
          )}
        </ContentContainer>
      </div>
    </InfoGeneralContainer>
  );
};
