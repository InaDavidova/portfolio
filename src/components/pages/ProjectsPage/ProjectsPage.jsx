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

  const handleTouchStart = useCallback(
    (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX);
      setScrollLeft(projectCardsWrapperRef.current.scrollLeft);
    },
    [projectCardsWrapperRef]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      requestAnimationFrame(() => {
        const distance = e.touches[0].pageX - startX;
        projectCardsWrapperRef.current.scrollLeft = scrollLeft - distance;
      });
    },
    [isDragging, startX, scrollLeft, projectCardsWrapperRef]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  return (
    <ProjectsPageContainer id="projects">
      <AnimatedTitle text={["My", "Projects"]} />
      <ProjectCardsWrapper
        $openProject={openProject}
        ref={projectCardsWrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
