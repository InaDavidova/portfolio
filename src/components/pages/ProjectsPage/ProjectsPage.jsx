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
  const [projectCardsWrapperRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);
      const pageX = e.pageX || e.touches[0].pageX;
      setStartX(pageX);
      setScrollLeft(projectCardsWrapperRef.current.scrollLeft);
    },
    [projectCardsWrapperRef]
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const speedFactor = 1;

      const pageX = e.pageX || e.touches[0].pageX;
      const distance = (pageX - startX) * speedFactor;
      projectCardsWrapperRef.current.scrollLeft = scrollLeft - distance;
      // requestAnimationFrame(() => {
      // });
    },
    [isDragging, startX, scrollLeft, projectCardsWrapperRef]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // const handleWheel = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     const speedFactor = 3;
  //     if (e.deltaY) {
  //       projectCardsWrapperRef.current.scrollLeft += e.deltaY * speedFactor;
  //     }
  //   },
  //   [projectCardsWrapperRef]
  // );

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

  // useEffect(() => {
  //   const container = projectCardsWrapperRef.current;
  //   const wheelHandler = (e) => handleWheel(e);

  //   if (openProject) {
  //     container.addEventListener("wheel", wheelHandler, { passive: false });
  //   } else {
  //     container.removeEventListener("wheel", wheelHandler);
  //   }

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     container.removeEventListener("wheel", wheelHandler);
  //   };
  // }, [handleWheel, projectCardsWrapperRef, openProject]);

  return (
    <ProjectsPageContainer id="projects">
      <AnimatedTitle text={["My", "Projects"]} />
      <ProjectCardsWrapper
        $openProject={openProject}
        ref={projectCardsWrapperRef}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        // onMouseDown={handleDragStart}
        // onMouseMove={handleDragMove}
        // onMouseUp={handleDragEnd}
        // onMouseLeave={handleDragEnd}
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
          <CarouselWrapper ref={carouselRef}>
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
                <ButtonLeft
                  onClick={() =>
                    activeImageNumber === 0
                      ? setActiveImageNumber(numberOfImages - 1)
                      : setActiveImageNumber(activeImageNumber - 1)
                  }
                >
                  <LeftArrow />
                </ButtonLeft>
                <ButtonRight
                  onClick={() => setActiveImageNumber(activeImageNumber + 1)}
                >
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
