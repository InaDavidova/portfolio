import styled, { keyframes } from "styled-components";
import clouds from "../../../images/clouds2.png";

const moveBackground = keyframes`
  0% {
    background-position: top;
    background-size: 300%; 
  }
 
  100% {
    background-position: -100px 0px;
    background-size: 250%;
  }
`;

const floating = keyframes`
  0% {
    transform: rotate(0deg) translate(-10px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(-10px) rotate(-360deg);
  }
`;

export const AboutPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: wrap;
  min-height: 100vh;
  background-color: #000417;
  overflow: hidden;

  & img.floating {
    width: 45%;
    height: 100%;
    animation: 10s linear ${floating} infinite;
    z-index: 1;
  }

  & img.skilsTitle {
    max-height: 500px;
    margin: auto;
    animation: 10s linear ${floating} infinite;
    z-index: 1;
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: no-repeat url(${clouds});
    background-size: cover;
    opacity: 0.1;
    animation: 200s linear ${moveBackground} infinite alternate;
  }
`;

export const StyledP = styled.p`
  width: 40%;
  margin: 100px auto auto auto;
  color: #b7fae6;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 1px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  z-index: 1;
`;

export const SkillSetContainer = styled.div`
  position: relative;
  height: 500px;
  width: 50%;
  margin-right: auto;
  margin-bottom: 50px;
  border-top: 1px solid #ffaa2a;
`;

export const ImageLayer = styled.img.attrs((props) => ({
  style: {
    transform: `translateX(${props.$cordinates.x + "px"})
    translateY(${props.$cordinates.y + "px"})`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
