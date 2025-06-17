import styled from "styled-components";

type FeatureCardProps = {
  title: string;
  description: string;
};

const StyledFeatureCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 10px;
  flex-direction: column;
  box-sizing: border-box;
  background-color: black;
  border-radius: 16px;
`;

const StyledFeatureCardTitle = styled.div`
  font-size: 28px;
`;

const StyledFeatureCardDescription = styled.span`
  font-size: 18px;
  text-align: center;
  letter-spacing: 0;
  font-family: "Rethink Sans", sans-serif;
  font-weight: 600;
  white-space: pre-line;

  @media (max-width: 720px) {
    font-size: 14px;
  }
`;

export const FeatureCard = ({ description, title }: FeatureCardProps) => {
  return (
    <StyledFeatureCardContainer>
      <StyledFeatureCardTitle>{title}</StyledFeatureCardTitle>
      <StyledFeatureCardDescription>{description}</StyledFeatureCardDescription>
    </StyledFeatureCardContainer>
  );
};
