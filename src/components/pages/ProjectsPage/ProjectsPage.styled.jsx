import styled from "styled-components";
import { device } from "../../../theme";

export const ProjectsPageContainer = styled.div`
  position: relative;
  background-color: #000417;
  overflow: hidden;
  padding-bottom: 50px;
`;

export const ProjectCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.$openProject ? "" : "wrap")};
  gap: 50px;
  justify-content: ${(props) => (props.$openProject ? "start" : "center")};
  padding: ${(props) =>
    props.$openProject ? "50px 20px 20px 20px" : "60px 20px"};
  margin-bottom: ${(props) => (props.$openProject ? "30px " : "0")};
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;

  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:decrement {
    width: 20px;
  }

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    border: 1px solid #b7fae6;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ff9900;
  }

  &::-webkit-scrollbar-thumb:active {
    border-color: #ff9900;
  }
`;

export const ProjectInformationContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 30px 20px;

  @media ${device.laptopL} {
    padding-top: 0;
  }

  @media ${device.tablet} {
    flex-direction: column-reverse;
    padding: 0 10px 20px 10px;
  }

  @media ${device.mobileL} {
    padding: 0 2px 20px 2px;
  }
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

  @media ${device.tablet} {
    width: 100%;
  }
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

  @media ${device.mobileL} {
    width: 40px;
    height: 40px;
  }
`;

export const ButtonLeft = styled(ButtonArrow)`
  position: absolute;
  top: 50%;
  left: 10px;

  @media ${device.mobileL} {
    left: 0;
  }
`;

export const ButtonRight = styled(ButtonArrow)`
  position: absolute;
  top: 50%;
  right: 10px;

  @media ${device.mobileL} {
    right: 0;
  }
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

  @media ${device.mobileL} {
    bottom: 3px;
    padding: 5px 20px;
  }
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

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const ProjectTitle = styled.h2`
  height: fit-content;
  margin: 10px auto 50px auto;
  color: #ff9900;
  text-align: center;
  letter-spacing: 1px;

  @media ${device.laptop} {
    margin-bottom: 20px;
  }

  @media ${device.tablet} {
    margin-bottom: 10px;
  }
`;

export const StyledP = styled.p`
  margin: 10px 40px;
  color: white;
  font-size: 1.5em;
  text-align: justify;
  letter-spacing: 1px;

  @media ${device.laptopL} {
    margin: 10px 20px;
    font-size: 1.2em;
    line-height: unset;
  }

  @media ${device.laptop} {
    margin: 0 0 10px 10px;
    font-size: 1em;
    line-height: unset;
  }

  @media ${device.tablet} {
    margin: 5px 20px;
    letter-spacing: 0;
  }
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

  @media ${device.tablet} {
    margin-bottom: 10px;
  }
`;
