import styled, { keyframes } from "styled-components";
import clouds from "../../../images/clouds.png";

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

const summaryTextAnimation = keyframes`
  0%{
    opacity: 0;
    transform: perspective(500px) translate3d(-35px, -40px, -150px) rotate3d(1, -1, 0, 35deg);
  }
  100%{
    opacity: 1;
    transform: perspective(500px) translate3d(0, 0, 0);
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

const itemsShow = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7)
  }
  60% {
    opacity: 1
  }
  100% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2727, 0.0986, 0.8333, 1)
  }
`;

const itemsHide = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: cubic-bezier(0.2727, 0.0986, 0.8333, 1)
  }
  40% {
    opacity: 1
  }
  100% {
    opacity: 0;
    transform: scale(0.7)
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
    animation-play-state: ${(props) =>
      props.$isInViewport ? "running" : "paused"};
    user-select: none;
    z-index: 1;
  }

  & img.subTitle {
    max-height: 500px;
    margin: auto;
    animation: 10s linear ${floating} infinite;
    animation-play-state: ${(props) =>
      props.$isInViewport ? "running" : "paused"};
    user-select: none;
    z-index: 1;
  }

  & img.subTitle:last-of-type {
    max-height: 370px;
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
    animation-play-state: ${(props) =>
      props.$isInViewport ? "running" : "paused"};
  }
`;

export const StyledP = styled.p`
  width: 40%;
  margin: 100px auto auto auto;
  color: #b7fae6;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: justify;
  opacity: ${(props) => (props.$isInViewport ? 1 : 0)};
  z-index: 1;
`;

export const Word = styled.span`
  display: inline-block;
  opacity: 0;
  animation: 1.5s forwards ${(props) => props.$index * 10 + 500}ms
    ${(props) => props.$isInViewport && summaryTextAnimation};
`;

export const SkillSetContainer = styled.div`
  position: relative;
  height: 500px;
  width: 50%;
  margin: 50px auto 10px 0;
  border-top: 1px solid #ffaa2a;
  user-select: none;
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

export const FunFactsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 500px;
  width: 50%;
  margin: 50px 0 10px auto;
  padding-right: 20px;
  text-align: justify;
  border-top: 1px solid #ffaa2a;
  color: #b7fae6;
  letter-spacing: 1px;
  z-index: 1;

  & li {
    opacity: 0;
    animation: ${(props) => (props.$isInViewport ? itemsShow : itemsHide)} 1s
      both;
  }

  & li:nth-child(1) {
    animation-delay: 180ms;
  }

  & li:nth-child(2) {
    animation-delay: 145ms;
  }

  & li:nth-child(3) {
    animation-delay: 170ms;
  }

  & li:nth-child(4) {
    animation-delay: 75ms;
  }

  & li:nth-child(5) {
    animation-delay: 100ms;
  }
`;
