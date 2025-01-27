import ParticleConstellationBg from "../../animations/ParticleConstellation/ParticleConstellationBg";
import TextAnimation from "../../animations/TextAnimation/TextAnimation";
import {
  LandingPageContainer,
  Letter,
  StyledImage,
  TitleContainer,
} from "./LandingPage.styled";
import inaImage from "../../../images/ina.png";
import { Fragment, useState } from "react";

function LandingPage() {
  const [firstLine] = useState("Hello there!");
  const [secondLine] = useState("I'm Ina,");
  return (
    <LandingPageContainer id="home">
      <ParticleConstellationBg />
      <StyledImage src={inaImage} alt="Photograph of Ina" />
      <TextAnimation />
      <TitleContainer>
        <h1>
          {firstLine.split("").map((el, i) => (
            <Fragment key={i}>
              {el && (
                <Letter $index={i} $lineNumber={0}>
                  {el}
                </Letter>
              )}
              {el === " " && el}
            </Fragment>
          ))}
        </h1>
        <h2>
          {secondLine.split("").map((el, i) => (
            <Fragment key={i}>
              {el && (
                <Letter $index={i} $lineNumber={1}>
                  {el}
                </Letter>
              )}
              {el === " " && el}
            </Fragment>
          ))}
        </h2>
      </TitleContainer>
    </LandingPageContainer>
  );
}

export default LandingPage;
