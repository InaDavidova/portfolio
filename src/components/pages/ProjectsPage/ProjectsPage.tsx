import {
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { data, ProjectInfo, ProjectKey } from "../../../utils/data";
import LeftArrow from "../../svgs/LeftArrow";
import RightArrow from "../../svgs/RightArrow";
import GithubIcon from "../../../images/github.png";

const PROJECT_KEYS: ProjectKey[] = [
  "planets-little-helper",
  "photo-hub",
  "complainer-app",
  "wildlife-photography",
  "portfolio",
];

function ProjectsPage() {
  const [openProject, setOpenProject] = useState<ProjectKey | "">("");
  const [activeImageNumber, setActiveImageNumber] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTouchStartX = useRef<number>(0);
  const carouselTouchEndX = useRef<number>(0);
  const isCarouselSwiped = useRef<boolean>(false);
  const [projectCardsWrapperRef, isVisible] =
    useElementOnScreen<HTMLDivElement>({
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

  const projectData = useMemo<ProjectInfo | null>(() => {
    if (!openProject) {
      return null;
    }
    return data[openProject];
  }, [openProject]);

  useEffect(() => {
    setActiveImageNumber(0);
  }, [openProject]);

  useEffect(() => {
    setImageLoaded(false);
  }, [openProject]);

  const numberOfImages = useMemo<number>(() => {
    if (!openProject || !projectData) {
      return 0;
    }
    return projectData.images.length;
  }, [projectData, openProject]);

  useEffect(() => {
    if (carouselRef.current && openProject && imageLoaded) {
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [openProject, carouselRef, imageLoaded]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const speedFactor = 3;
      if (e.deltaY) {
        requestAnimationFrame(() => {
          if (projectCardsWrapperRef.current) {
            projectCardsWrapperRef.current.scrollLeft += e.deltaY * speedFactor;
          }
        });
      }
    },
    [projectCardsWrapperRef]
  );

  useEffect(() => {
    const container = projectCardsWrapperRef.current;
    if (!container || !openProject) {
      return;
    }
    const wheelHandler = (e: WheelEvent) => handleWheel(e);
    container.addEventListener("wheel", wheelHandler, { passive: false });

    // Cleanup event listeners on component unmount
    return () => {
      container.removeEventListener("wheel", wheelHandler);
    };
  }, [handleWheel, projectCardsWrapperRef, openProject]);

  const incrementActiveImageNumber = useCallback(() => {
    setActiveImageNumber((prev) => {
      if (numberOfImages < 1) {
        return 0;
      }
      return (prev + 1) % numberOfImages;
    });
  }, [numberOfImages]);

  const decrementActiveImageNumber = useCallback(() => {
    setActiveImageNumber((prev) => {
      if (numberOfImages < 1) {
        return 0;
      }
      return prev === 0 ? numberOfImages - 1 : prev - 1;
    });
  }, [numberOfImages]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    carouselTouchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    isCarouselSwiped.current = true;
    carouselTouchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = carouselTouchStartX.current - carouselTouchEndX.current;
    if (!isCarouselSwiped.current) return;
    if (distance > 50) {
      incrementActiveImageNumber();
    } else if (distance < -50) {
      decrementActiveImageNumber();
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
        {PROJECT_KEYS.map((project, index) => (
          <ProjectCard
            key={project}
            project={project}
            openProject={openProject}
            setOpenProject={setOpenProject}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </ProjectCardsWrapper>
      {openProject && projectData && (
        <ProjectInformationContainer>
          <CloseButton
            onClick={() => setOpenProject("")}
            type="button"
            aria-label="Close project details"
          >
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
                key={`${img}-${index}`}
                src={img}
                alt={`${projectData.title} screenshot ${index + 1} of ${numberOfImages}`}
                loading={index === 0 ? "eager" : "lazy"}
                $index={index}
                $activeImageNumber={activeImageNumber}
                $numberOfImages={numberOfImages}
                onLoad={() => setImageLoaded(true)}
              />
            ))}
            {numberOfImages > 1 && (
              <>
                <ButtonLeft
                  onClick={decrementActiveImageNumber}
                  type="button"
                  aria-label="Show previous project screenshot"
                >
                  <LeftArrow />
                </ButtonLeft>
                <ButtonRight
                  onClick={incrementActiveImageNumber}
                  type="button"
                  aria-label="Show next project screenshot"
                >
                  <RightArrow />
                </ButtonRight>
                <DotButtonsContainer>
                  {projectData.images.map((_, i) => (
                    <DotButton
                      key={i}
                      type="button"
                      aria-label={`Go to screenshot ${i + 1}`}
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
            <GithubLink
              href={projectData.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to GitHub <img src={GithubIcon} alt="GitHub icon" />
            </GithubLink>
          </InformationWrapper>
        </ProjectInformationContainer>
      )}
    </ProjectsPageContainer>
  );
}

export default ProjectsPage;
