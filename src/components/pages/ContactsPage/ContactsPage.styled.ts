import styled, { keyframes } from "styled-components";
import clouds from "../../../images/clouds.png";
import { device } from "../../../theme";
import { colorTokens } from "../../../tokens";

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

const messageFadeInAndOut = keyframes`
  0% {
    opacity: 0;
    visibility: visible;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const nameInputBounce = keyframes`
  0% {
    transform: translateY(-200px); 
    opacity: 0;
  }
`;

const emailInputBounce = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    transform: translateY(-100px); 
    opacity: 0;
  }
`;

const textareaBounce = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    transform: translateY(-80px); 
    opacity: 0;
  }
`;

const buttonBounce = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    transform: translateY(-50px); 
    opacity: 0;
  }
`;

const floatingRight = keyframes`
  0% {
    transform: rotate(0deg) translate(-3px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(-3px) rotate(-360deg);
  }
`;

const floatingLeft = keyframes`
  0% {
    transform: rotate(0deg) translate(3px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(3px) rotate(-360deg);
  }
`;

export type NotificationType = "" | "success" | "fail";

interface ContactsPageContainerProps {
  $isFormVisible: boolean;
}

export const ContactsPageContainer = styled.div<ContactsPageContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colorTokens.backgroundDark};
  overflow: hidden;

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
      props.$isFormVisible ? "running" : "paused"};
  }
`;

export const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
  max-width: 700px;
  margin: auto auto 30px auto;

  @media ${device.laptop} {
    width: 55%;
  }

  @media ${device.tablet} {
    width: 70%;
  }

  @media ${device.mobileL} {
    width: 90%;
  }
`;

interface NotificationMessageProps {
  $type: NotificationType;
}

export const NotificationMessage = styled.p<NotificationMessageProps>`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  width: max-content;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  color: ${colorTokens.backgroundDark};
  background-color: ${(props) =>
    props.$type === "success" ? colorTokens.success : colorTokens.danger};
  animation: 5s forwards 0s ${(props) => props.$type && messageFadeInAndOut};
`;

interface ErrorMessageProps {
  $isVisible: boolean;
}

export const ErrorMessage = styled.p<ErrorMessageProps>`
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  width: fit-content;
  margin: auto;
  padding: 2px 10px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  color: ${colorTokens.accent};
  box-shadow: 0 0 5px ${colorTokens.accent};
  transform: translateY(-5px);
`;

interface FormVisibleProps {
  $isFormVisible: boolean;
}

export const StyledInput = styled.input<FormVisibleProps>`
  height: 30px;
  border: none;
  border-bottom: 1px solid ${colorTokens.mint};
  color: ${colorTokens.mint};
  font-size: 16px;
  text-indent: 15px;
  background-color: transparent;
  box-shadow: 0 0 8px ${colorTokens.accent};
  clip-path: inset(1px 1px -8px 1px);
  opacity: ${(props) => (props.$isFormVisible ? 1 : 0)};
  outline: none;

  &:hover {
    border-color: ${colorTokens.accent};
  }

  &:focus {
    border-color: ${colorTokens.accent};
    box-shadow: 0 0 12px ${colorTokens.mint};
    clip-path: inset(1px 1px -12px 1px);
  }

  &:-webkit-autofill,
  :-webkit-autofill:hover {
    box-shadow: 0 0 8px ${colorTokens.accent};
    border-bottom: 1px solid ${colorTokens.mint};
    -webkit-text-fill-color: ${colorTokens.mint};
    -webkit-background-clip: text;
    clip-path: inset(2px 2px -12px 2px);
    caret-color: ${colorTokens.mint};
  }

  &:-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 12px ${colorTokens.mint};
    border-bottom: 1px solid ${colorTokens.accent};
  }
`;

export const NameInput = styled(StyledInput)`
  animation: 1.5s forwards 0s
    ${(props) => (props.$isFormVisible ? nameInputBounce : "")};
`;

export const EmailInput = styled(StyledInput)`
  animation: 1.5s forwards 0s
    ${(props) => (props.$isFormVisible ? emailInputBounce : "")};
`;

export const MessageTextarea = styled.textarea<FormVisibleProps>`
  min-height: 30px;
  max-height: 210px;
  line-height: 20px;
  margin-top: 30px;
  border: none;
  border-bottom: 1px solid ${colorTokens.mint};
  color: ${colorTokens.mint};
  padding: 0 3px;
  font-size: 16px;
  text-indent: 12px;
  background-color: transparent;
  box-shadow: 0 0 8px ${colorTokens.accent};
  clip-path: inset(1px 1px -8px 1px);
  outline: none;
  resize: vertical;
  opacity: ${(props) => (props.$isFormVisible ? 1 : 0)};
  animation: 1.5s forwards 0s
    ${(props) => (props.$isFormVisible ? textareaBounce : "")};

  &:hover {
    border-color: ${colorTokens.accent};
  }

  &:focus {
    border-color: ${colorTokens.accent};
    box-shadow: 0 0 12px ${colorTokens.mint};
    clip-path: inset(1px 1px -12px 1px);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${colorTokens.accent};
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const SendButton = styled.button<FormVisibleProps>`
  width: 200px;
  height: 33px;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
  background-color: ${colorTokens.mint};
  box-shadow: 0 0 4px ${colorTokens.mint};
  color: ${colorTokens.backgroundDark};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => !props.$isFormVisible && 0};
  animation: 1.5s forwards 0s
    ${(props) => (props.$isFormVisible ? buttonBounce : "")};
  transition: 0.3s;

  &:hover {
    background-color: ${colorTokens.backgroundDark};
    box-shadow: 0 0 5px ${colorTokens.accent};
    color: ${colorTokens.accent};
  }

  &:disabled {
    box-shadow: none;
    background-color: ${colorTokens.disabledBg};
    color: ${colorTokens.disabledText};
    cursor: default;

    &:hover {
      transform: translateY(0);
    }
  }
`;

export const FindMeP = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto auto 20px auto;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: ${colorTokens.accent};
  z-index: 1;
`;

export const StyledA = styled.a<FormVisibleProps>`
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border-top-right-radius: 30%;
  overflow: hidden;

  & svg {
    width: inherit;
    height: inherit;

    & .yellowParticle {
      animation: 5s infinite 0s
        ${(props) => (props.$isFormVisible ? floatingRight : "")} linear;
      animation-play-state: ${(props) =>
        props.$isFormVisible ? "running" : "paused"};

      &:nth-child(2) {
        animation-delay: 1s;
      }

      &:nth-child(3) {
        animation-delay: 1.5s;
      }

      &:nth-child(4) {
        animation-delay: 2s;
      }
    }

    & .blueParticle {
      animation: 5s infinite 0s
        ${(props) => (props.$isFormVisible ? floatingLeft : "")} linear;
      animation-play-state: ${(props) =>
        props.$isFormVisible ? "running" : "paused"};

      &:nth-child(2) {
        animation-delay: 1s;
      }

      &:nth-child(3) {
        animation-delay: 1.5s;
      }

      &:nth-child(4) {
        animation-delay: 2s;
      }
    }
  }

  &:hover {
    & .darkCirle {
      transform-origin: 19.5% 19%;
      transform: scale(1.6);
    }

    & .outlinePart {
      fill: ${colorTokens.accent};
      transform-origin: 19.5% 19%;
      transform: scale(1.4);
    }

    & .contentPart {
      transform-origin: 19.5% 19%;
      transform: scale(1.3);
    }
  }
`;
