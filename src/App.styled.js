import styled from "styled-components";

export const ContentWrapper = styled.div`
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 9px;
  }

  &::-webkit-scrollbar-track {
    background: #b7fae6;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff9900;
    border-radius: 10px;
  }
`;
