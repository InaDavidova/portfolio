import styled, { keyframes } from "styled-components";

const lineAnimation = keyframes`
  0% {
    left: -100%;
  }
  40% {
    left: 0;
  }
  50% {
    left: 0;
  }
  100% {
    left: 105%;
}
`;

const slideUpAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  60% {
    transform: translateY(-30%);
    }
  100% {
    transform: translateY(0%);
    }
`;

const imageSlideUpAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
 
  100% {
    transform: translateY(0%);
    }
`;

export const Letter = styled.b`
  display: inline-block;
  color: ${(props) =>
    props.$lineNumber === 1 &&
    props.$index > 2 &&
    props.$index < 7 &&
    "#ff9900"};
  transform: translateY(100%);
  animation: 0.25s forwards
    ${(props) => `${props.$index * 120 + props.$lineNumber * 2000}ms`} ${slideUpAnimation};
`;

export const TitleContainer = styled.div`
  position: absolute;
  bottom: 50%;
  margin-left: 10%;
  background-color: transparent;
  color: #b7fae6;

  & h1,
  h2 {
    position: relative;
    width: fit-content;
    font-size: 60px;
    overflow: hidden;
  }

  & h1::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 105%;
    width: 100%;
    height: 1px;
    background-color: #ffaa2a;
    box-shadow: 0 0 5px #ffa825;
    animation: 1.5s forwards 0s ${lineAnimation};
  }

  & h2::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 105%;
    width: 100%;
    height: 1px;
    background-color: #ffaa2a;
    box-shadow: 0 0 5px #ffa825;
    animation: 1.1s forwards 2s ${lineAnimation};
  }

  & span {
    color: #ff9900;
  }
`;

export const StyledImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 6%;
  height: 90vh;
  transform: translateY(100%);
  animation: 1.5s forwards 3s ${imageSlideUpAnimation};
`;

export const LandingPageContainer = styled.div`
  position: relative;
  max-height: 100vh;
  overflow: hidden;
`;
