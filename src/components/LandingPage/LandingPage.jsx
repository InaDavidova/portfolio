import ParticleConstellationBg from "../ParticleConstellation/ParticleConstellationBg";
import { TitleContainer } from "./LandingPage.styled";

function LandingPage() {
  return (
    <>
      <TitleContainer>
        <h1>
          Hello there! <br /> I'm <span>Ina</span>,
        </h1>
        <h2>Software Engineer</h2>
      </TitleContainer>
      <ParticleConstellationBg />
    </>
  );
}

export default LandingPage;
