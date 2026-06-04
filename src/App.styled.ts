import styled from "styled-components";
import { colorTokens } from "./tokens";

export const ContentWrapper = styled.div`
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${colorTokens.backgroundDark};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colorTokens.accent};
    border-radius: 10px;
  }
`;
