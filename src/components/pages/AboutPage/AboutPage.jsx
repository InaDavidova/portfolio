import useElementOnScreen from "../../../utils/useElementOnScreen";
import { AboutPageContainer, StyledH1, StyledP } from "./AboutPage.styled";
import inaImage from "../../../images/ina2.png";

function AboutPage() {
  const [elementRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    treshold: 0.1,
  });

  return (
    <AboutPageContainer id="about">
      <StyledH1 ref={elementRef} $isVisible={isVisible}>
        <span>About</span> <span>Me</span>
      </StyledH1>
      <img src={inaImage} alt="Portrait" />
      <StyledP>
        As a software engineer, I'm dedicated to crafting efficient solutions
        that enhance user experience. My journey into tech began high above the
        clouds as a flight attendant. There, I mastered communication, teamwork,
        and quick problem-solving in dynamic environments. Beyond the world of
        technology, I enjoy staying active through sports and exploring new
        destinations and cultures. These experiences fuel my adventurous spirit
        and bring a fresh perspective to my work. Dive into my projects to see
        my tech evolution in action.
      </StyledP>
    </AboutPageContainer>
  );
}

export default AboutPage;
