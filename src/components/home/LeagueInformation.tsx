import styled from "styled-components";
import item1 from "../../assets/information/item-1.png";
import item2 from "../../assets/information/item-2.png";
import item3 from "../../assets/information/item-3.png";
import item4 from "../../assets/information/item-4.png";

const CardContainer = styled.div`
  background-color: #001e2d;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const CardItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 24px;
`;

const CardItem = styled.div`
  width: 290px;
  height: 140px;
  border-radius: 20px;
  background-color: #024463;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  gap: 12px;
`;

const CardData = [
  {
    image: item1,
    description: "Liga Tier 4 abierta para todos",
  },
  {
    image: item2,
    description: "Jugadores de toda Latinoamérica",
  },
  {
    image: item3,
    description: "Inscríbete con tu equipo o únete como jugador disponible",
  },
  {
    image: item4,
    description: "¡Demuestra tu nivel y sube en la escena!",
  },
];

const Text = styled.p`
  font-family: "Montserrat", sans-serif;

  font-size: 15px;
  font-weight: 400;
  color: #FFFFFF;
`;

export const LeagueInformation = () => {
  return (
    <CardContainer>
      <CardItemsContainer>
        {CardData.map((item) => (
          <CardItem>
            <img src={item.image} />
            <Text>{item.description}</Text>
          </CardItem>
        ))}
      </CardItemsContainer>
    </CardContainer>
  );
};
