import ParticleConstellationBg from "../ParticleConstellation/ParticleConstellationBg";
import TextAnimation from "../TextAnimation/TextAnimation";
import { LandingPageContainer, Letter, StyledImage, TitleContainer } from "./LandingPage.styled";
import inaImage from "../../images/ina.png";
import { Fragment, useState } from "react";

function LandingPage() {
  const [firstLine] = useState("Hello there!");
  const [secondLine] = useState("I'm Ina,");
  return (
    <LandingPageContainer>
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
      <ParticleConstellationBg />
      <TextAnimation />
      <StyledImage src={inaImage} alt="Photograph of Ina" />
    </LandingPageContainer>
  );
}

export default LandingPage;
