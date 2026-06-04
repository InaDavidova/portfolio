import {
  Fragment,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import {
  AboutPageContainer,
  FunFactsContainer,
  FunFactsWrapper,
  ImageLayer,
  SkillSetContainer,
  SkillsWrapper,
  StyledP,
  SummaryWrapper,
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

const SUMMARY_TEXT =
  "As a software engineer, I'm dedicated to crafting efficient solutions that enhance user experience. My journey into tech began high above the clouds as a flight attendant. There, I mastered communication, teamwork, and quick problem-solving in dynamic environments. Beyond the world of technology, I enjoy staying active through sports and exploring new destinations and cultures. These experiences fuel my adventurous spirit and bring a fresh perspective to my work. Dive into my projects to see my tech evolution in action.".split(
    " "
  );

const FUN_FACTS = [
  "I can move different parts of my face, and my nose? I can wiggle it in two different ways - I'm basically the Houdini of facial expressions!",
  "Traded in my wings for a keyboard - went from soaring through the skies to soaring through code as a software engineer!",
  "Went from puffing to pacing! Ran my first half-marathon just six months after breaking up with my long-term relationship with cigarettes. Who knew quitting smoking would lead to sprinting towards the finish line?",
  "In the last five years, I've had more addresses than a spy in a spy novel! From the bustling streets of Berlin to the sunny shores of Faro, then the vibrant city life of Lisbon, and finally, the romance of Paris.",
  "My love for coconut is no joke - I'm like a coconut detective, sniffing out coconut-flavored everything wherever I go!",
];

interface MouseCordinates {
  x: number;
  y: number;
}

interface ViewportSize {
  width: number;
  height: number;
}

function AboutPage() {
  const [mouseCordinates, setMouseCordinates] = useState<MouseCordinates>({
    x: 0,
    y: 0,
  });
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const animationFrameRef = useRef<number | null>(null);
  const [pRef, isPVisible] = useElementOnScreen<HTMLParagraphElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  const [ulRef, isUlVisible] = useElementOnScreen<HTMLUListElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });
  const [isAboutPageInViewport, isAboutPageVisible] =
    useElementOnScreen<HTMLDivElement>({
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isAboutPageVisible) {
        return;
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      const x = e.clientX;
      const y = e.clientY;
      animationFrameRef.current = window.requestAnimationFrame(() => {
        setMouseCordinates({ x, y });
        animationFrameRef.current = null;
      });
    },
    [isAboutPageVisible]
  );

  const getImageCordinates = (speed: number): { x: number; y: number } => {
    const x = (viewportSize.width - mouseCordinates.x * speed) / 100;
    const y = (viewportSize.height - mouseCordinates.y * speed) / 100;

    return { x, y };
  };

  return (
    <AboutPageContainer
      id="about"
      onMouseMove={handleMouseMove}
      ref={isAboutPageInViewport}
      $isInViewport={isAboutPageVisible}
    >
      <AnimatedTitle text={["About", "Me"]} />
      <SummaryWrapper>
        <img src={inaImg} alt="Ina, software engineer" className="floating" />
        <StyledP ref={pRef} $isInViewport={isPVisible}>
          {SUMMARY_TEXT.map((el, i) => (
            <Fragment key={i}>
              {el && (
                <Word $index={i} $isInViewport={isPVisible}>
                  {el}
                </Word>
              )}{" "}
            </Fragment>
          ))}
        </StyledP>
      </SummaryWrapper>

      <SkillsWrapper>
        <img src={brainImg} alt="Skills and technologies" className="subTitle" />
        <SkillSetContainer>
          <ImageLayer
            src={jsImg}
            alt="JavaScript icon"
            $cordinates={getImageCordinates(-0.6)}
          />
          <ImageLayer
            src={htmlImg}
            alt="HTML icon"
            $cordinates={getImageCordinates(1)}
          />
          <ImageLayer
            src={cssImg}
            alt="CSS icon"
            $cordinates={getImageCordinates(0.6)}
          />
          <ImageLayer
            src={vtkImg}
            alt="VTK.js icon"
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
            alt="Node.js icon"
            $cordinates={getImageCordinates(0.5)}
          />
          <ImageLayer
            src={expressImg}
            alt="Express.js icon"
            $cordinates={getImageCordinates(-0.8)}
          />
          <ImageLayer
            src={reactImg}
            alt="React icon"
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
      </SkillsWrapper>

      <FunFactsWrapper>
        <img src={funFactsImg} alt="Fun facts" className="subTitle" />
        <FunFactsContainer ref={ulRef} $isInViewport={isUlVisible}>
          {FUN_FACTS.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </FunFactsContainer>
      </FunFactsWrapper>
    </AboutPageContainer>
  );
}

export default AboutPage;
