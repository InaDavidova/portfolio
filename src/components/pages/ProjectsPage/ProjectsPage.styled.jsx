import styled from "styled-components";

export const ProjectsPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #000417;
  overflow: hidden;
`;

export const ProjectCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.$openProject ? "" : "wrap")};
  gap: 40px;
  justify-content: space-around;
  padding: 30px 20px;
`;

export const ProjectInformationContainer = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  padding: 30px 20px;
  border: 2px solid yellow;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 25px;
  background-color: #fff;
  border-radius: 50%;
  border: none;
  color: #ff9900;
  font-size: 27px;
  line-height: 0;
  cursor: pointer;

  &:hover {
    transform: rotate(90deg) scale(1.3);
    transition: 350ms;
  }
`;
