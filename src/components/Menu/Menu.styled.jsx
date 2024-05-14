import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const coordinates = {
  1: { x: 1, y: 70 },
  2: { x: 33, y: 60 },
  3: { x: 58, y: 34 },
  4: { x: 70, y: 1 },
};

const linkAnimationForward = (linkNumber) => keyframes`
    0% {
      transform: translateX(0) translateY(0);
    }

    100% {
        transform: translateX(${coordinates[linkNumber].y}px)
        translateY(${coordinates[linkNumber].x}px) rotate(360deg);
    }
`;

const linkAnimationBackward = (linkNumber) => keyframes`
    0% {
        transform: translateX(${coordinates[linkNumber].y}px)
        translateY(${coordinates[linkNumber].x}px) rotate(360deg);
    }

    100% {
        transform: translateX(0) translateY(0);
    }
`;

export const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1px;
  z-index: 1;
`;

export const StyledMenuButton = styled.button`
  position: fixed;
  top: -42px;
  left: -42px;
  width: 84px;
  height: 84px;
  border: none;
  border-radius: 50%;
  background-color: #b7fae6;
  box-shadow: 0 0 ${(props) => (props.$isOpen ? "8px" : "4px")} #b7fae6;
  cursor: pointer;
  z-index: 2;
  transition: 0.35s ease;

  &:hover {
    box-shadow: 0 0 10px #ff9900;

    div {
      border-color: #ff9900;
      background-color: #ff9900;
    }
  }
`;

export const LineDiv = styled.div`
  position: absolute;
  bottom: ${(props) =>
    props.$isOpen ? "23px" : props.$lineNumber === 1 ? "27px" : "18px"};
  right: 16px;
  width: 18px;
  border: 2px solid #000417;
  background-color: #000417;
  border-radius: 5px;
  transform: ${(props) =>
    props.$isOpen &&
    `rotateZ(${props.$lineNumber === 1 ? "45deg" : "-45deg"})`};
  transition: 0.35s ease;
`;

export const StyledNav = styled.nav`
  position: absolute;
  width: 1px;
  z-index: 1;
`;

export const StyledLink = styled(Link)`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  width: 28px;
  height: 28px;
  padding: 5px;
  background-color: #b7fae6;
  color: #000417;
  border-radius: 50%;
  box-shadow: inset 0 0 3px #000417;
  animation: 1s forwards
    ${(props) =>
      props.$isOpen
        ? linkAnimationForward(props.$linkNumber)
        : props.$isOpen === false
        ? linkAnimationBackward(props.$linkNumber)
        : null};
  transition: 0.35s ease;

  & svg {
    fill: #000417;
    width: inherit;
    height: inherit;
  }

  &:hover {
    box-shadow: 0 0 7px #ff9900;
    background-color: #000417;

    & svg {
      fill: #ff9900;
    }
  }
`;
