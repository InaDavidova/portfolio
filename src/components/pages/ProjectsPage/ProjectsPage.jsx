import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import ProjectCard from "../../ProjectCard/ProjectCard";
import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";
import {
  ButtonLeft,
  ButtonRight,
  CarouselImage,
  CarouselWrapper,
  CloseButton,
  DotButton,
  DotButtonsContainer,
  GithubLink,
  InformationWrapper,
  ProjectCardsWrapper,
  ProjectInformationContainer,
  ProjectTitle,
  ProjectsPageContainer,
  StyledP,
} from "./ProjectsPage.styled";
import { data } from "../../../utils/data";
import LeftArrow from "../../svgs/LeftArrow";
import RightArrow from "../../svgs/RightArrow";
import GithubIcon from "../../../images/github.png";

function ProjectsPage() {
  const [openProject, setOpenProject] = useState("");
  const [projects] = useState([
    "planets-little-helper",
    "photo-hub",
    "complainer-app",
    "wildlife-photography",
    "portfolio",
  ]);
  const [activeImageNumber, setActiveImageNumber] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const carouselRef = useRef();
  const carouselTouchStartX = useRef(0);
  const carouselTouchEndX = useRef(0);
  const isCarouselSwiped = useRef(false);
  const [projectCardsWrapperRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const projectData = useMemo(() => {
    if (!openProject) {
      return null;
    }
    setActiveImageNumber(0);
    return data[openProject];
  }, [openProject]);

  useEffect(() => {
    setImageLoaded(false);
  }, [openProject]);

  const numberOfImages = useMemo(() => {
    if (!openProject) {
      return 0;
    }
    return projectData.images.length;
  }, [projectData, openProject]);

  useEffect(() => {
    if (carouselRef && openProject && imageLoaded) {
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [openProject, carouselRef, imageLoaded]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const speedFactor = 3;
      if (e.deltaY) {
        requestAnimationFrame(() => {
          projectCardsWrapperRef.current.scrollLeft += e.deltaY * speedFactor;
        });
      }
    },
    [projectCardsWrapperRef]
  );

  useEffect(() => {
    const container = projectCardsWrapperRef.current;
    const wheelHandler = (e) => handleWheel(e);

    if (openProject) {
      container.addEventListener("wheel", wheelHandler, { passive: false });
    } else {
      container.removeEventListener("wheel", wheelHandler);
    }

    // Cleanup event listeners on component unmount
    return () => {
      container.removeEventListener("wheel", wheelHandler);
    };
  }, [handleWheel, projectCardsWrapperRef, openProject]);

  const incrementActiveImageNumber = () => {
    setActiveImageNumber(activeImageNumber + 1);
  };

  const dencrementActiveImageNumber = () => {
    activeImageNumber === 0
      ? setActiveImageNumber(numberOfImages - 1)
      : setActiveImageNumber(activeImageNumber - 1);
  };

  const handleTouchStart = (e) => {
    carouselTouchStartX.current = e.touches[0].clientX; // Capture the starting touch position
  };

  const handleTouchMove = (e) => {
    isCarouselSwiped.current = true;
    carouselTouchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = carouselTouchStartX.current - carouselTouchEndX.current;
    if (!isCarouselSwiped.current) return;
    if (distance > 50) {
      // Swiped left
      incrementActiveImageNumber();
    } else if (distance < -50) {
      // Swiped right
      dencrementActiveImageNumber();
    }

    isCarouselSwiped.current = false;
  };

  return (
    <ProjectsPageContainer id="projects">
      <AnimatedTitle text={["My", "Projects"]} />
      <ProjectCardsWrapper
        $openProject={openProject}
        ref={projectCardsWrapperRef}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            openProject={openProject}
            setOpenProject={setOpenProject}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </ProjectCardsWrapper>
      {openProject && (
        <ProjectInformationContainer>
          <CloseButton onClick={() => setOpenProject("")}>
            {"\u2716"}
          </CloseButton>
          <CarouselWrapper
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {projectData.images.map((img, index) => (
              <CarouselImage
                key={index}
                src={img}
                $index={index}
                $activeImageNumber={activeImageNumber}
                $numberOfImages={numberOfImages}
                onLoad={() => setImageLoaded(true)}
              />
            ))}
            {numberOfImages > 1 && (
              <>
                <ButtonLeft onClick={dencrementActiveImageNumber}>
                  <LeftArrow />
                </ButtonLeft>
                <ButtonRight onClick={incrementActiveImageNumber}>
                  <RightArrow />
                </ButtonRight>
                <DotButtonsContainer>
                  {projectData.images.map((_, i) => (
                    <DotButton
                      key={i}
                      onClick={() => setActiveImageNumber(i)}
                      $isActive={activeImageNumber % numberOfImages === i}
                    />
                  ))}
                </DotButtonsContainer>
              </>
            )}
          </CarouselWrapper>
          <InformationWrapper>
            <ProjectTitle>{projectData.title}</ProjectTitle>
            {projectData.description.map((el, i) => (
              <StyledP key={i}>{el}</StyledP>
            ))}
            <GithubLink href={projectData.githubLink} target="_blank">
              Link to Github <img src={GithubIcon} alt="Github icon" />
            </GithubLink>
          </InformationWrapper>
        </ProjectInformationContainer>
      )}
    </ProjectsPageContainer>
  );
}

export default ProjectsPage;
