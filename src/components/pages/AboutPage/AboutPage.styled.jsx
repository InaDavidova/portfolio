import styled, { keyframes } from "styled-components";
import clouds from "../../../images/clouds.png";
import { device } from "../../../theme";

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
    width: 50%;
    object-fit: contain;
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

export const SummaryWrapper = styled.div`
  display: flex;

  & img.floating {
    height: fit-content;
  }

  @media ${device.laptop} {
    display: block;
    margin-top: 30px;

    & img.floating {
      float: left;
      height: auto;
    }
  }

  @media ${device.mobileL} {
    & img.floating {
      width: 50%;
    }
  }
`;

export const StyledP = styled.p`
  width: 50%;
  margin: auto;
  padding-top: 30px;
  color: #b7fae6;
  font-size: 2.1em;
  line-height: 1.6em;
  letter-spacing: 1px;
  text-align: justify;
  opacity: ${(props) => (props.$isInViewport ? 1 : 0)};
  z-index: 1;

  @media ${device.laptopL} {
    width: 40%;
    margin-top: 3%;
    font-size: 1.4em;
    line-height: 1.4em;
  }

  @media ${device.laptop} {
    width: unset;
    padding: 0 40px;
    font-size: 1.3em;
    line-height: 1.3em;
  }

  @media ${device.tablet} {
    font-size: 1.2em;
    line-height: 1.2em;
    letter-spacing: 0;
  }

  @media ${device.mobileL} {
    padding: 0 20px;
    font-size: 1.1em;
  }
`;

export const Word = styled.span`
  display: inline-block;
  opacity: 0;
  animation: 1.5s forwards ${(props) => props.$index * 10 + 500}ms
    ${(props) => props.$isInViewport && summaryTextAnimation};
`;

export const SkillsWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse;
  width: 100%;

  @media ${device.tablet} {
    flex-flow: column;
    width: 95%;
    margin: 50px auto 0 auto;
    border-top: 1px solid #ffaa2a;

    & img {
      width: 100%;
    }
  }
`;

export const SkillSetContainer = styled.div`
  position: relative;
  min-height: 500px;
  width: 50%;
  margin: 50px auto 10px 0;
  border-top: 1px solid #ffaa2a;
  user-select: none;

  @media ${device.tablet} {
    width: 100%;
    min-height: 350px;
    margin-top: -2vh;
    border: none;
  }

  @media ${device.mobileL} {
    min-height: 250px;
  }
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

export const FunFactsWrapper = styled.div`
  display: flex;

  @media ${device.tablet} {
    width: 95%;
    flex-direction: column;
    border-top: 1px solid #ffaa2a;
    margin: 30px auto 0 auto;
    padding-top: 30px;
  }
`;

export const FunFactsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  min-height: 500px;
  width: 50%;
  margin: 50px 0 10px auto;
  padding: 50px 20px 50px 0;
  text-align: justify;
  border-top: 1px solid #ffaa2a;
  color: #b7fae6;
  letter-spacing: 1px;
  font-size: 2.1em;
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

  @media ${device.desktop} {
    font-size: 1.5em;
  }

  @media ${device.laptopL} {
    font-size: 1.2em;
  }

  @media ${device.laptop} {
    font-size: 1em;
  }

  @media ${device.tablet} {
    width: 100%;
    height: unset;
    padding: 0 20px 0 30px;
    margin: -50px 0 0 0;
    border: none;
    letter-spacing: 0;
  }

  @media ${device.mobileL} {
    margin: 0 0 20px 0;
    font-size: 0.9em;
  }
`;
