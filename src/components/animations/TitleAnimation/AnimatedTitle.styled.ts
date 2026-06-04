import styled, { keyframes } from "styled-components";
import { colorTokens } from "../../../tokens";

const lineAnimationLeftLine = keyframes`
  0% {
    right: 100%;
  }
  70% {
    right: 50%;
    background-color: ${colorTokens.accent};
    box-shadow: 0 0 5px ${colorTokens.accent};
  }
  100% {
    right: 50%;
    background-color: ${colorTokens.mint};
    box-shadow: none;

  }
`;

const lineAnimationRightLine = keyframes`
  0% {
    left: 100%;
  }
  70% {
    left: 50%;
    background-color: ${colorTokens.accent};
    box-shadow: 0 0 5px ${colorTokens.accent};
  }
  100% {
    left: 50%;
    background-color: ${colorTokens.mint};
    box-shadow: none;
  }
`;

const leftWordAnimation = keyframes`
  0% {
    right: 100vw;
  }
  50%{
    right:0;
    color: ${colorTokens.mint};
    text-shadow: 0 0 5px ${colorTokens.mint};
  }
  100% {
    right: 0;
    color: ${colorTokens.accent};
    text-shadow: none;
  }
`;

const rightWordAnimation = keyframes`
  0% {
    left: 100vw;
  }
  50%{
    left: 0;
    color: ${colorTokens.mint};
    text-shadow: 0 0 5px ${colorTokens.mint};
  }
  100% {
    left: 0;
    color: ${colorTokens.accent};
    text-shadow: 0 0 5px none;
  }
`;

interface StyledH1Props {
  $isVisible: boolean;
  $text: [string, string];
}

export const StyledH1 = styled.h1<StyledH1Props>`
  position: relative;
  width: 100%;
  height: 80px;
  margin-top: 5px;
  padding-top: 40px;
  color: transparent;
  text-align: center;
  z-index: 1;

  & span:nth-of-type(1) {
    position: relative;

    &:before {
      content: "${(props) => props.$text[0]}";
      display: block;
      position: absolute;
      top: 0;
      right: 100vw;
      animation: 1s forwards 0s
        ${(props) => (props.$isVisible ? leftWordAnimation : "")};
    }
  }

  & span:nth-of-type(2) {
    position: relative;

    &:before {
      content: "${(props) => props.$text[1]}";
      display: block;
      position: absolute;
      top: 0;
      left: 100vw;
      animation: 1s forwards 0s
        ${(props) => (props.$isVisible ? rightWordAnimation : "")};
    }
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    right: 100%;
    width: 50%;
    height: 1px;
    background-color: ${colorTokens.accent};
    animation: 1.5s forwards 0s
      ${(props) => (props.$isVisible ? lineAnimationLeftLine : "")};
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 100%;
    width: 50%;
    height: 1px;
    background-color: ${colorTokens.accent};
    animation: 1.5s forwards 0s
      ${(props) => (props.$isVisible ? lineAnimationRightLine : "")};
  }
`;

