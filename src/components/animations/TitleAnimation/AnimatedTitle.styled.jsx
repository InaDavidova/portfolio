import styled, { keyframes } from "styled-components";

const lineAnimationLeftLine = keyframes`
  0% {
    right: 100%;
  }
  70% {
    right: 50%;
    background-color: #ffaa2a;
    box-shadow: 0 0 5px #ffaa2a;
  }
  100% {
    right: 50%;
    background-color: #b7fae6;
    box-shadow: none;

  }
`;

const lineAnimationRightLine = keyframes`
  0% {
    left: 100%;
  }
  70% {
    left: 50%;
    background-color: #ffaa2a;
    box-shadow: 0 0 5px #ffaa2a;
  }
  100% {
    left: 50%;
    background-color: #b7fae6;
    box-shadow: none;
  }
`;

const leftWordAnimation = keyframes`
  0% {
    right: 100%;
  }
  50%{
    right: 50%;
    color: #b7fae6;
    text-shadow: 0 0 5px #b7fae6;
  }
  100% {
    right: 50%;
    color: #ff9900;
    text-shadow: none;
  }
`;

const rightWordAnimation = keyframes`
  0% {
    left: 100%;
  }
  50%{
    left: 50%;
    color: #b7fae6;
    text-shadow: 0 0 5px #b7fae6;
  }
  100% {
    left: 50%;
    color: #ff9900;
    text-shadow: 0 0 5px none;
  }
`;

export const StyledH1 = styled.h1`
  position: relative;
  width: 100%;
  height: 80px;
  margin-top: 5px;
  color: #ff9900;
  z-index: 1;

  & span:nth-of-type(1) {
    position: absolute;
    top: 40px;
    right: 100%;
    margin-right: 10px;
    animation: 1s forwards 0s
      ${(props) => (props.$isVisible ? leftWordAnimation : "")};
  }

  & span:nth-of-type(2) {
    position: absolute;
    top: 40px;
    left: 100%;
    animation: 1s forwards 0s
      ${(props) => (props.$isVisible ? rightWordAnimation : "")};
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    right: 100%;
    width: 50%;
    height: 1px;
    background-color: #ffaa2a;
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
    background-color: #ffaa2a;
    animation: 1.5s forwards 0s
      ${(props) => (props.$isVisible ? lineAnimationRightLine : "")};
  }
`;
