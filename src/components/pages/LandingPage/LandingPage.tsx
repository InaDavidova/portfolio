import ParticleConstellationBg from "../../animations/ParticleConstellation/ParticleConstellationBg";
import TextAnimation from "../../animations/TextAnimation/TextAnimation";
import {
  LandingPageContainer,
  Letter,
  StyledImage,
  TitleContainer,
} from "./LandingPage.styled";
import inaImage from "../../../images/ina.png";
import { Fragment } from "react";

const FIRST_LINE = "Hello there!";
const SECOND_LINE = "I'm Ina,";

type LineNumber = 0 | 1;

function renderAnimatedLine(line: string, lineNumber: LineNumber) {
  return line.split("").map((char, i) => (
    <Fragment key={i}>
      {char === " " ? (
        " "
      ) : (
        <Letter $index={i} $lineNumber={lineNumber}>
          {char}
        </Letter>
      )}
    </Fragment>
  ));
}

function LandingPage() {
  return (
    <LandingPageContainer id="home">
      <ParticleConstellationBg />
      <StyledImage src={inaImage} alt="Photograph of Ina" />
      <TextAnimation />
      <TitleContainer>
        <h1>{renderAnimatedLine(FIRST_LINE, 0)}</h1>
        <h2>{renderAnimatedLine(SECOND_LINE, 1)}</h2>
      </TitleContainer>
    </LandingPageContainer>
  );
}

export default LandingPage;
