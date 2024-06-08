import styled from "styled-components";
import inaImg from "../../images/projects/planets-little-helper1.png";

export const CardWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const StyledCard = styled.div.attrs((props) => ({
  style: {
    width: props.$width + "px",
    height: props.$height + "px",
    backgroundPosition: `${props.$cordinates.bx}% ${props.$cordinates.by}%`,
    transform: `perspective(500px) rotateX(${props.$cordinates.rx + "deg"})
        rotateY(${props.$cordinates.ry + "deg"})`,
  },
}))`
  position: relative;
  background: no-repeat url(${inaImg});
  background-size: cover;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.$project === props.$openProject
      ? "0 0 10px #ff9900"
      : "inset 0 0 10px black"};
  cursor: ${(props) =>
    props.$project === props.$openProject ? "" : "pointer"};
  transition: width 1s, height 1s;

  &:hover {
    box-shadow: ${(props) =>
      props.$project === props.$openProject ? "" : "inset 0 0 50px black"};
  }
`;

export const StyledButton = styled.button`
  position: absolute;
  right: -20px;
  bottom: 35px;
  padding: 7px 30px;
  background-color: #000417;
  color: #b7fae6;
  box-shadow: 1px 1px 5px #b7fae6;
  border: none;
  letter-spacing: 1px;
  transform: rotate(-50deg) translateZ(20px);

  &:hover {
    transform: rotate(-50deg) translateZ(20px) scale(1.05);
    color: #ff9900;
    box-shadow: 1px 1px 5px #ff9900;
  }
`;
