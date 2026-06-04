import styled, { keyframes } from "styled-components";
import { data, ProjectKey } from "../../utils/data";
import { colorTokens } from "../../tokens";

const cardBounce = keyframes`
  0% {
    transform: translateY(-100px); 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const CardWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

export interface CardCordinates {
  rx: number | string;
  ry: number | string;
  bx: number | string;
  by: number | string;
}

export interface StyledCardProps {
  $cordinates: CardCordinates;
  $width: number;
  $height: number;
  $project: ProjectKey;
  $openProject: ProjectKey | "";
  $isVisible: boolean;
  $index: number;
}

export const StyledCard = styled.div.attrs<StyledCardProps>((props) => ({
  style: {
    width: props.$width + "px",
    height: props.$height + "px",
    backgroundPosition: props.$openProject
      ? "20%"
      : `${props.$cordinates.bx}% ${props.$cordinates.by}%`,
    transform: `perspective(500px) rotateX(${props.$cordinates.rx + "deg"})
        rotateY(${props.$cordinates.ry + "deg"})`,
  },
}))`
  position: relative;
  background: no-repeat
    url(${(props: StyledCardProps) => data[props.$project].thumbnail});
  background-size: cover;
  transform-style: preserve-3d;
  border-radius: 5px;
  opacity: 0;
  box-shadow: ${(props) =>
    props.$project === props.$openProject
      ? `0 0 10px ${colorTokens.accent}`
      : `inset 0 0 10px ${colorTokens.black}`};
  cursor: ${(props) =>
    props.$openProject && props.$project !== props.$openProject
      ? "pointer"
      : ""};
  animation: 1.5s forwards ${(props) => props.$index * 250}ms
    ${(props) => (props.$isVisible ? cardBounce : "")};
  transition: ${(props) =>
    props.$openProject ? "width 1s, height 0s" : "width 0s, height 1s"};

  &:hover {
    box-shadow: ${(props) =>
      props.$project === props.$openProject
        ? ""
        : `inset 0 0 50px ${colorTokens.black}`};
  }
`;

export const StyledButton = styled.button`
  position: absolute;
  right: -20px;
  bottom: 35px;
  padding: 7px 30px;
  background-color: ${colorTokens.backgroundDark};
  color: ${colorTokens.mint};
  box-shadow: 1px 1px 5px ${colorTokens.mint};
  border: none;
  letter-spacing: 1px;
  transform: rotate(-50deg) translateZ(20px);
  cursor: pointer;

  &:hover {
    transform: rotate(-50deg) translateZ(20px) scale(1.05);
    color: ${colorTokens.accent};
    box-shadow: 1px 1px 5px ${colorTokens.accent};
  }
`;
