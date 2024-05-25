import { useEffect, useState } from "react";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import {
  AboutPageContainer,
  ImageLayer,
  SkillSetContainer,
  StyledH1,
  StyledP,
} from "./AboutPage.styled";
import inaImg from "../../../images/ina2.png";
import htmlImg from "../../../images/html.png";
import cssImg from "../../../images/css.png";
import jsImg from "../../../images/js.png";
import reactImg from "../../../images/react.png";
import angularImg from "../../../images/angular.png";
import brainImg from "../../../images/brain.png";
import expressImg from "../../../images/express.png";
import jestImg from "../../../images/jest.png";
import mongodbImg from "../../../images/mongodb.png";
import mysqlImg from "../../../images/mysql.png";
import nodeImg from "../../../images/node.png";
import tsImg from "../../../images/ts.png";
import vtkImg from "../../../images/vtk.png";

function AboutPage() {
  const [mouseCordinates, setMouseCordinates] = useState({ x: 0, y: 0 });
  const [widowWidth] = useState(window.innerWidth);
  const [widowHeight] = useState(window.innerHeight);
  const [elementRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    treshold: 0.1,
  });
  const [pRef, isPVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    treshold: 0.1,
  });

  const [text] = useState(
    "As a software engineer, I'm dedicated to crafting efficient solutions that enhance user experience. My journey into tech began high above the clouds as a flight attendant. There, I mastered communication, teamwork, and quick problem-solving in dynamic environments. Beyond the world of technology, I enjoy staying active through sports and exploring new destinations and cultures. These experiences fuel my adventurous spirit and bring a fresh perspective to my work. Dive into my projects to see my tech evolution in action.".split(
      " "
    )
  );
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isPVisible) {
      return;
    }

    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(displayedText + " " + text[index]);
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, displayedText, isPVisible]);

  const getImageCordinates = (speed) => {
    const x = (widowWidth - mouseCordinates.x * speed) / 100;
    const y = (widowHeight - mouseCordinates.y * speed) / 100;

    return { x, y };
  };

  return (
    <AboutPageContainer
      id="about"
      onMouseMove={(e) => setMouseCordinates({ x: e.screenX, y: e.screenY })}
    >
      <StyledH1 ref={elementRef} $isVisible={isVisible}>
        <span>About</span> <span>Me</span>
      </StyledH1>
      <img src={inaImg} alt="Portrait" className="floating" />
      <StyledP ref={pRef}>{displayedText || " "}</StyledP>

      <SkillSetContainer>
        <ImageLayer
          src={jsImg}
          alt="JavaScrips icon"
          $cordinates={getImageCordinates(-0.5)}
        />
        <ImageLayer
          src={htmlImg}
          alt="HTML icon"
          $cordinates={getImageCordinates(1)}
        />
        <ImageLayer
          src={cssImg}
          alt="SCC icon"
          $cordinates={getImageCordinates(0.5)}
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
          $cordinates={getImageCordinates(0.2)}
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
      <img src={brainImg} alt="Title text" className="skilsTitle" />
    </AboutPageContainer>
  );
}

export default AboutPage;
