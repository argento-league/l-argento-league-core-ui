import styled from "styled-components";
import item1 from "../../assets/information/item-1.png";
import item2 from "../../assets/information/item-2.png";
import item3 from "../../assets/information/item-3.png";
import item4 from "../../assets/information/item-4.png";

const MainRootContainer = styled.div`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  gap: 16px;
  background: #3b6377;
  background-image: url("/home-background.jpg");

  background-blend-mode: multiply;
  @media (max-width: 720px) {
    padding: 16px;
  }
`;

const MainContentGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(5, 150px);
  gap: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 150px);
  }
`;

interface BoxProps {
  col?: string;
  row?: string;
  colTablet?: string;
  rowTablet?: string;
  colMobile?: string;
  rowMobile?: string;
}

const GridBox = styled.div<BoxProps>`
  background: #00000080;
  color: white;
  border-radius: 8px;

  /* Desktop */
  grid-column: ${(props) => props.col || "1 / 6"};
  grid-row: ${(props) => props.row || "1 / 3"};

  /* Tablet */
  @media (max-width: 1024px) {
    grid-column: ${(props) => props.colTablet || "1 / 6"};
    grid-row: ${(props) => props.rowTablet || "1 / 3"};
  }
`;

export const MainContent = () => {
  return (
    <MainRootContainer>
      <MainContentGroup>
        <GridBox
          col="1 / 13"
          row="1 / 4"
          colTablet="1 / 13"
          rowTablet="1 / 4"
          colMobile="1 / -1"
        >
          <div style={{paddingTop: "16px", paddingBottom:"32px", gap: "16px"}}>
            <img
              src="/images/argento-logo.png"
              alt="Argento Logo"
              width={"200px"}
            />
            <h1
              style={{
                fontSize: "44px",
                color: "white",
                marginTop: "16px",
                letterSpacing: "0",
              }}
            >
              Liga Argentina de Dota 2 para todo LATAM.
            </h1>
          </div>
        </GridBox>
        <GridBox col="13 / 21" row="1 / 1" colTablet="1 / 13" rowTablet="6 / 8">
          2
        </GridBox>
        <GridBox
          col="13 / 21"
          row="2 / 2"
          colTablet="1 / 13"
          rowTablet="11 / 12"
        >
          3
        </GridBox>
        <GridBox
          col="1 / 7"
          row="4 / 5"
          colTablet="1 / 7"
          rowTablet="4 / 5"
          colMobile="1 / -1"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              gap: "10px",
              flexDirection: "column",
              boxSizing: "border-box",
              backgroundColor: "black",
              borderRadius: "16px",
            }}
          >
            <img
              src={item1}
              alt="Item 1"
              style={{ width: "28px", height: "28px" }}
            />
            <span
              style={{
                fontSize: "18px",
                textAlign: "center",
                letterSpacing: "0",
              }}
            >
              Liga tier 4 abierta para todos
            </span>
          </div>
        </GridBox>
        <GridBox
          col="7 / 13"
          row="4 / 5"
          colTablet="7 / 13"
          rowTablet="4 / 5"
          colMobile="1 / -1"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              gap: "10px",
              flexDirection: "column",
              boxSizing: "border-box",
              backgroundColor: "black",
              borderRadius: "16px",
            }}
          >
            <img
              src={item2}
              alt="Item 2"
              style={{ width: "28px", height: "28px" }}
            />

            <span style={{ fontSize: "18px", textAlign: "center" }}>
              Jugadores de toda Latinoamérica
            </span>
          </div>
        </GridBox>
        <GridBox
          col="1 / 7"
          row="5 / 6"
          colTablet="1 / 7"
          rowTablet="5 / 6"
          colMobile="1 / -1"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              gap: "10px",
              flexDirection: "column",
              boxSizing: "border-box",
              backgroundColor: "black",
              borderRadius: "16px",
            }}
          >
            <img
              src={item3}
              alt="Item 3"
              style={{ width: "28px", height: "28px" }}
            />
            <span style={{ fontSize: "18px", textAlign: "center" }}>
              Inscríbete con tu equipo o únete como jugador disponible
            </span>
          </div>
        </GridBox>
        <GridBox
          col="7 / 13"
          row="5 / 6"
          colTablet="7 / 13"
          rowTablet="5 / 6"
          colMobile="1 / -1"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              gap: "10px",
              flexDirection: "column",
              boxSizing: "border-box",
              backgroundColor: "black",
              borderRadius: "16px",
            }}
          >
            <img
              src={item4}
              alt="Item 4"
              style={{ width: "28px", height: "28px" }}
            />
            <span style={{ fontSize: "18px", textAlign: "center" }}>
              ¡Demuestra tu nivel y sube en la escena!
            </span>
          </div>
        </GridBox>
        <GridBox
          col="13 / 21"
          row="3 / 6"
          colTablet="1 / 13"
          rowTablet="8 / 11"
        >
          8
        </GridBox>
      </MainContentGroup>
      {/* <MainContentContainer>
        <MainImage src="/images/argento-logo.png" />
        <MainContentText>
          <MainContentTextTitle>
            Liga Argentina de Dota 2 para todo LATAM.
          </MainContentTextTitle>
        </MainContentText>
      </MainContentContainer> */}
    </MainRootContainer>
  );
};
