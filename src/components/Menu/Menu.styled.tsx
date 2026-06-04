import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { colorTokens } from "../../tokens";

type LinkNumber = 1 | 2 | 3 | 4;

const coordinates: Record<LinkNumber, { x: number; y: number }> = {
  1: { x: 1, y: 72 },
  2: { x: 34, y: 59 },
  3: { x: 59, y: 34 },
  4: { x: 72, y: 1 },
};

const linkAnimationForward = (linkNumber: LinkNumber) => keyframes`
    0% {
      transform: translateX(0) translateY(0);
    }

    100% {
        transform: translateX(${coordinates[linkNumber].y}px)
        translateY(${coordinates[linkNumber].x}px) rotate(360deg);
    }
`;

const linkAnimationBackward = (linkNumber: LinkNumber) => keyframes`
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
  z-index: 2;
`;

interface StyledMenuButtonProps {
  $isOpen?: boolean;
}

export const StyledMenuButton = styled.button<StyledMenuButtonProps>`
  position: fixed;
  top: -57px;
  left: -57px;
  width: 114px;
  height: 114px;
  border: none;
  border-radius: 50%;
  background-color: ${colorTokens.mint};
  box-shadow: 0 0 ${(props) => (props.$isOpen ? "8px" : "4px")} ${colorTokens.mint};
  cursor: pointer;
  z-index: 2;
  transition: 0.35s ease;

  &:hover {
    box-shadow: 0 0 10px ${colorTokens.accent};

    div {
      border-color: ${colorTokens.accent};
      background-color: ${colorTokens.accent};
    }
  }
`;

interface LineDivProps {
  $isOpen?: boolean;
  $lineNumber: 1 | 2;
}

export const LineDiv = styled.div<LineDivProps>`
  position: absolute;
  bottom: ${(props) =>
    props.$isOpen ? "30px" : props.$lineNumber === 1 ? "34px" : "25px"};
  right: 25px;
  width: 20px;
  border: 2px solid ${colorTokens.backgroundDark};
  background-color: ${colorTokens.backgroundDark};
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

interface StyledLinkProps {
  $isOpen?: boolean;
  $linkNumber: LinkNumber;
  $title: string;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  width: 32px;
  height: 32px;
  padding: 5px;
  background-color: ${colorTokens.mint};
  color: ${colorTokens.backgroundDark};
  border-radius: 50%;
  box-shadow: inset 0 0 3px ${colorTokens.backgroundDark};
  animation: 1s forwards
    ${(props) =>
      props.$isOpen
        ? linkAnimationForward(props.$linkNumber)
        : props.$isOpen === false
        ? linkAnimationBackward(props.$linkNumber)
        : null};
  transition: 0.35s ease;
  outline: none;

  & svg {
    fill: ${colorTokens.backgroundDark};
    width: inherit;
    height: inherit;
  }

  &:hover,
  &:focus-visible {
    box-shadow: 0 0 7px ${colorTokens.accent};
    background-color: ${colorTokens.backgroundDark};

    & svg {
      fill: ${colorTokens.accent};
    }

    &::after {
      content: "${(props) => props.$title}";
      position: absolute;
      top: ${(props) => (props.$linkNumber === 4 ? "20px" : "10px")};
      left: ${(props) => (props.$linkNumber === 4 ? "30px" : "33px")};
      color: ${colorTokens.accent};
      text-shadow: 0 0 2px ${colorTokens.backgroundDark}, 0 0 2px ${colorTokens.backgroundDark}, 0 0 2px ${colorTokens.backgroundDark},
        0 0 2px ${colorTokens.backgroundDark}, 0 0 2px ${colorTokens.backgroundDark};
      padding: 0 3px;
      border-bottom: 1px solid ${colorTokens.mint};
      box-shadow: 0 0 8px ${colorTokens.accent};
      clip-path: inset(1px 1px -8px 1px);
      font-size: 12px;
      white-space: nowrap;
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${colorTokens.accentAlpha50};
  }
`;
