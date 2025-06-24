import { useState } from "react";
import styled from "styled-components";
import {
  INFORMATION,
  INFORMATION_ENUM,
} from "../../../../constants/current-season/information";
import { ContentListItem, ContentText, ContentTitle } from "../Info";

type MenuItemContainerProps = {
  isSelected: boolean;
  hasBorder?: boolean;
};

const AnswerText = styled.div<{ open: boolean }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  max-height: ${({ open }) => (open ? "800px" : "0px")};
  overflow: hidden;
  font-size: 16px;
  background-color: black;
`;

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

const MobileMenuItemContainer = styled(
  MenuItemContainer
)<MenuItemContainerProps>`
  border-radius: ${(props) =>
    props.isSelected ? "16px 16px 0px 0px" : "16px"};
  background-color: ${(props) => (props.isSelected ? "#FF611D" : "black")};
  color: ${(props) => (props.isSelected ? "black" : "#FF611D")};
`;

export const ContentContainer = styled.div`
  padding: 24px;
  border: 1px solid #ff611d;
  border-radius: 16px;
  font-family: Rethink Sans, sans-serif;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const ContentContainerMobile = styled(ContentContainer)`
  border-radius: 0px 0px 16px 16px;
`;

export const InfoTabContentMobile = () => {
  const [value, setValue] = useState<INFORMATION_ENUM | null>(
    INFORMATION_ENUM.ARMADO_DE_EQUIPO
  );

  const handleItemOnClick = (subject: INFORMATION_ENUM) => {
    if (value === subject) {
      setValue(null);
    } else {
      setValue(subject);
    }
  };

  return (
    <div
      style={{
        padding: "32px 16px",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
        color: "#FABF4A",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <InformationMobile
        subject={INFORMATION_ENUM.ARMADO_DE_EQUIPO}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.ARMADO_DE_EQUIPO)}
        isSelected={value === INFORMATION_ENUM.ARMADO_DE_EQUIPO}
        title={INFORMATION[INFORMATION_ENUM.ARMADO_DE_EQUIPO].title}
        description={INFORMATION[INFORMATION_ENUM.ARMADO_DE_EQUIPO].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.CAPITANES}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.CAPITANES)}
        isSelected={value === INFORMATION_ENUM.CAPITANES}
        title={INFORMATION[INFORMATION_ENUM.CAPITANES].title}
        description={INFORMATION[INFORMATION_ENUM.CAPITANES].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.CUENTAS_DE_STEAM}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.CUENTAS_DE_STEAM)}
        isSelected={value === INFORMATION_ENUM.CUENTAS_DE_STEAM}
        title={INFORMATION[INFORMATION_ENUM.CUENTAS_DE_STEAM].title}
        description={INFORMATION[INFORMATION_ENUM.CUENTAS_DE_STEAM].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.FECHAS_DE_JUEGO}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.FECHAS_DE_JUEGO)}
        isSelected={value === INFORMATION_ENUM.FECHAS_DE_JUEGO}
        title={INFORMATION[INFORMATION_ENUM.FECHAS_DE_JUEGO].title}
        description={INFORMATION[INFORMATION_ENUM.FECHAS_DE_JUEGO].description}
      ></InformationMobile>
    </div>
  );
};

type InformationMobileProps = {
  onClick: (value: any) => void;
  isSelected: boolean;
  title: string;
  description?: string | string[];
  subject?: string;
};

export const InformationMobile = ({
  onClick,
  isSelected,
  title,
  description,
  subject,
}: InformationMobileProps) => {
  return (
    <div>
      <MobileMenuItemContainer
        isSelected={isSelected}
        onClick={onClick}
        hasBorder
      >
        <p>{subject}</p>
      </MobileMenuItemContainer>
      <AnswerText open={isSelected}>
        <div style={{ width: "100%" }}>
          <ContentContainerMobile>
            <ContentTitle>{title}</ContentTitle>
            {Array.isArray(description) && description.length > 1 ? (
              description.map((el) => (
                <ContentListItem key={el}>{el}</ContentListItem>
              ))
            ) : (
              <ContentText>{description}</ContentText>
            )}
          </ContentContainerMobile>
        </div>
      </AnswerText>
    </div>
  );
};
