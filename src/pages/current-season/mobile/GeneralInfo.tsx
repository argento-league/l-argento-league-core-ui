import { useState } from "react";
import {
  AnswerText,
  ContentListItem,
  ContentText,
  ContentTitle,
  MobileMenuItemContainer,
} from "..";
import styled from "styled-components";

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

type Information = {
  subject?: string;
  title: string;
  description: string[];
};

enum INFORMATION_ENUM {
  ARMADO_DE_EQUIPO = "Armado de equipos",
  CAPITANES = "Capitanes",
  CUENTAS_DE_STEAM = "Cuentas de Steam",
  FECHAS_DE_JUEGO = "Fechas de juego",
}

const information: Record<INFORMATION_ENUM, Information> = {
  [INFORMATION_ENUM.ARMADO_DE_EQUIPO]: {
    title: "Medalla libre",
    description: [
      "La medalla de los jugadores es libre. Los equipos pueden conformarse con jugadores de cualquier medalla, el único requisito es que el equipo en juego no debe superar la suma de 37.000 de mmr.",
      "El roster puede contar con 5 titulares y 3 suplentes.",
      "Esta limitado los jugadores peruanos nuevos por equipos a 2.",
    ],
  },
  [INFORMATION_ENUM.CAPITANES]: {
    title: "Capitanes",
    description: [
      "Todos los capitanes de un equipo deben ser hispanohablantes y comunicarse con el staff para poder ser notificados de los eventos de la season.",
    ],
  },
  [INFORMATION_ENUM.CUENTAS_DE_STEAM]: {
    title: "Players en la liga",
    description: [
      "Todas las cuentas tienen que estar calibradas, tener mas de 5k horas y 4k de partidas (cualquier duda consultar con el Staff).",
      "Perfil de dota y steam tienen que ser públicos al momento de la inscripción.",
    ],
  },
  [INFORMATION_ENUM.FECHAS_DE_JUEGO]: {
    title: "Días y horarios",
    description: [
      "El staff definirá las semanas en las que se deba jugar cada instancia de la season.",
      "Los días y horarios serán arreglados por los capitanes de los equipos y notificados al staff.",
      "En caso de no acordar un día y horario entre capitanes, el staff definirá uno por defecto.",
    ],
  },
};

export const InfoGeneralMobile = () => {
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
        title={information[INFORMATION_ENUM.ARMADO_DE_EQUIPO].title}
        description={information[INFORMATION_ENUM.ARMADO_DE_EQUIPO].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.CAPITANES}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.CAPITANES)}
        isSelected={value === INFORMATION_ENUM.CAPITANES}
        title={information[INFORMATION_ENUM.CAPITANES].title}
        description={information[INFORMATION_ENUM.CAPITANES].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.CUENTAS_DE_STEAM}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.CUENTAS_DE_STEAM)}
        isSelected={value === INFORMATION_ENUM.CUENTAS_DE_STEAM}
        title={information[INFORMATION_ENUM.CUENTAS_DE_STEAM].title}
        description={information[INFORMATION_ENUM.CUENTAS_DE_STEAM].description}
      ></InformationMobile>

      <InformationMobile
        subject={INFORMATION_ENUM.FECHAS_DE_JUEGO}
        onClick={() => handleItemOnClick(INFORMATION_ENUM.FECHAS_DE_JUEGO)}
        isSelected={value === INFORMATION_ENUM.FECHAS_DE_JUEGO}
        title={information[INFORMATION_ENUM.FECHAS_DE_JUEGO].title}
        description={information[INFORMATION_ENUM.FECHAS_DE_JUEGO].description}
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
