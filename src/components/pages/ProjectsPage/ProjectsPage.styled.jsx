import styled from "styled-components";

export const ProjectsPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #000417;
  overflow: hidden;
`;

export const ProjectCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.$openProject ? "" : "wrap")};
  gap: 50px;
  justify-content: center;
  padding: 60px 20px;
`;

export const ProjectInformationContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 30px 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 25px;
  border-radius: 50%;
  border: none;
  color: #ff9900;
  font-size: 27px;
  line-height: 0;
  cursor: pointer;

  &:hover {
    transform: rotate(90deg) scale(1.3);
    transition: 350ms;
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 55%;
  border-radius: 5px;
  border: none;
`;

export const CarouselImage = styled.img`
  width: ${(props) =>
    props.$index === props.$activeImageNumber % props.$numberOfImages
      ? "100%"
      : "0%"};
  object-fit: contain;
  border-radius: 5px;
  border: none;
  opacity: ${(props) =>
    props.$index === props.$activeImageNumber % props.$numberOfImages ? 1 : 0};
  transition: opacity 1.2s linear;
`;

export const ButtonArrow = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #00041790;
  cursor: pointer;
  transition: 200ms;

  & svg {
    fill: #ff9900;
  }

  &:hover {
    box-shadow: inset 0 0 5px #ff9900;
    transform: scale(1.05);
  }
`;

export const ButtonLeft = styled(ButtonArrow)`
  position: absolute;
  top: 50%;
  left: 10px;
`;

export const ButtonRight = styled(ButtonArrow)`
  position: absolute;
  top: 50%;
  right: 10px;
`;

export const DotButtonsContainer = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50%;
  display: flex;
  gap: 10px;
  padding: 12px 30px;
  border: 1px solid #000417;
  border-radius: 25px;
  background-color: #00041770;
  transform: translateX(-50%);
`;

export const DotButton = styled.button`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 1px solid #000417;
  background-color: ${(props) => (props.$isActive ? "#ff9900" : "#ff990080")};
  transform: ${(props) => (props.$isActive ? "scale(1.5)" : "")};
  transition: 200ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.5);
  }
`;

export const InformationWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
`;

export const ProjectTitle = styled.h2`
  height: fit-content;
  margin: 10px auto 50px auto;
  color: #ff9900;
  text-align: center;
  letter-spacing: 1px;
`;

export const StyledP = styled.p`
  margin: 10px 40px;
  color: white;
  font-size: 18px;
  line-height: 23px;
  text-align: justify;
  letter-spacing: 1px;
`;

export const GithubLink = styled.a`
  margin: auto auto 0 auto;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s;
  clip-path: inset(1px 1px -8px 1px);

  & img {
    height: 25px;
  }

  &:hover {
    transform: scale(1.03);
    border-bottom: 1px solid #b7fae6;
    box-shadow: 0 0 8px #ff9900;
  }
`;
