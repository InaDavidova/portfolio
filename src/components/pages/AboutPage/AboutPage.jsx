import { Fragment, useState } from "react";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import {
  AboutPageContainer,
  FunFactsContainer,
  ImageLayer,
  SkillSetContainer,
  StyledP,
  Word,
} from "./AboutPage.styled";
import inaImg from "../../../images/ina2.png";
import htmlImg from "../../../images/technologies/html.png";
import cssImg from "../../../images/technologies/css.png";
import jsImg from "../../../images/technologies/js.png";
import reactImg from "../../../images/technologies/react.png";
import angularImg from "../../../images/technologies/angular.png";
import brainImg from "../../../images/brain.png";
import funFactsImg from "../../../images/fun-facts.png";
import expressImg from "../../../images/technologies/express.png";
import jestImg from "../../../images/technologies/jest.png";
import mongodbImg from "../../../images/technologies/mongodb.png";
import mysqlImg from "../../../images/technologies/mysql.png";
import nodeImg from "../../../images/technologies/node.png";
import tsImg from "../../../images/technologies/ts.png";
import vtkImg from "../../../images/technologies/vtk.png";
import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";

function AboutPage() {
  const [mouseCordinates, setMouseCordinates] = useState({ x: 0, y: 0 });
  const [widowWidth] = useState(window.innerWidth);
  const [widowHeight] = useState(window.innerHeight);
  const [pRef, isPVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  const [ulRef, isUlVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });
  const [isAboutPageInViewport, isAboutPageVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const [summaryText] = useState(
    "As a software engineer, I'm dedicated to crafting efficient solutions that enhance user experience. My journey into tech began high above the clouds as a flight attendant. There, I mastered communication, teamwork, and quick problem-solving in dynamic environments. Beyond the world of technology, I enjoy staying active through sports and exploring new destinations and cultures. These experiences fuel my adventurous spirit and bring a fresh perspective to my work. Dive into my projects to see my tech evolution in action.".split(
      " "
    )
  );
  const [funFacts] = useState([
    "I can move different parts of my face, and my nose? I can wiggle it in two different ways - I'm basically the Houdini of facial expressions!",
    "Traded in my wings for a keyboard - went from soaring through the skies to soaring through code as a software engineer!",
    "Went from puffing to pacing! Ran my first half-marathon just six months after breaking up with my long-term relationship with cigarettes. Who knew quitting smoking would lead to sprinting towards the finish line?",
    "In the last five years, I've had more addresses than a spy in a spy novel! From the bustling streets of Berlin to the sunny shores of Faro, then the vibrant city life of Lisbon, and finally, the romance of Paris.",
    "My love for coconut is no joke - I'm like a coconut detective, sniffing out coconut-flavored everything wherever I go!",
  ]);

  const getImageCordinates = (speed) => {
    const x = (widowWidth - mouseCordinates.x * speed) / 100;
    const y = (widowHeight - mouseCordinates.y * speed) / 100;

    return { x, y };
  };

  return (
    <AboutPageContainer
      id="about"
      onMouseMove={(e) => setMouseCordinates({ x: e.screenX, y: e.screenY })}
      ref={isAboutPageInViewport}
      $isInViewport={isAboutPageVisible}
    >
      <AnimatedTitle text={["About", "Me"]} />
      <img src={inaImg} alt="Portrait" className="floating" />
      <StyledP ref={pRef} $isInViewport={isPVisible}>
        {summaryText.map((el, i) => (
          <Fragment key={i}>
            {el && (
              <Word $index={i} $isInViewport={isPVisible}>
                {el}
              </Word>
            )}{" "}
          </Fragment>
        ))}
      </StyledP>

      <SkillSetContainer>
        <ImageLayer
          src={jsImg}
          alt="JavaScrips icon"
          $cordinates={getImageCordinates(-0.6)}
        />
        <ImageLayer
          src={htmlImg}
          alt="HTML icon"
          $cordinates={getImageCordinates(1)}
        />
        <ImageLayer
          src={cssImg}
          alt="SCC icon"
          $cordinates={getImageCordinates(0.6)}
        />
        <ImageLayer
          src={vtkImg}
          alt="VtkJS icon"
          $cordinates={getImageCordinates(-0.6)}
        />
        <ImageLayer
          src={mysqlImg}
          alt="MySQL icon"
          $cordinates={getImageCordinates(0.6)}
        />
        <ImageLayer
          src={mongodbImg}
          alt="MongoDB icon"
          $cordinates={getImageCordinates(0.7)}
        />
        <ImageLayer
          src={nodeImg}
          alt="NodeJS icon"
          $cordinates={getImageCordinates(0.5)}
        />
        <ImageLayer
          src={expressImg}
          alt="ExpressJS icon"
          $cordinates={getImageCordinates(-0.8)}
        />
        <ImageLayer
          src={reactImg}
          alt="ReactJS icon"
          $cordinates={getImageCordinates(2)}
        />
        <ImageLayer
          src={tsImg}
          alt="TypeScript icon"
          $cordinates={getImageCordinates(-0.5)}
        />
        <ImageLayer
          src={angularImg}
          alt="AngularJS icon"
          $cordinates={getImageCordinates(0.5)}
        />
        <ImageLayer
          src={jestImg}
          alt="Jest icon"
          $cordinates={getImageCordinates(0.8)}
        />
      </SkillSetContainer>
      <img src={brainImg} alt="Title text" className="subTitle" />
      <img src={funFactsImg} alt="Title text" className="subTitle" />
      <FunFactsContainer ref={ulRef} $isInViewport={isUlVisible}>
        {funFacts.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </FunFactsContainer>
    </AboutPageContainer>
  );
}

export default AboutPage;
