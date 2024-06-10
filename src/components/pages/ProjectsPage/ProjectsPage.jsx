import { useMemo, useState } from "react";
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
  ProjectCardsWrapper,
  ProjectInformationContainer,
  ProjectTitle,
  ProjectsPageContainer,
} from "./ProjectsPage.styled";
import { data } from "../../../utils/data";
import LeftArrow from "../../svgs/LeftArrow";
import RightArrow from "../../svgs/RightArrow";

function ProjectsPage() {
  const [openProject, setOpenProject] = useState("");
  const [projects] = useState([
    "planets-little-helper",
    "something 2",
    "something 3",
    "something 4",
  ]);
  const [activeImageNumber, setActiveImageNumber] = useState(0);

  const numberOfImages = useMemo(() => {
    if (!openProject) {
      return 0;
    }
    return data[openProject].images.length;
  }, [openProject]);

  return (
    <ProjectsPageContainer id="projects">
      <AnimatedTitle text={["My", "Projects"]} />
      <ProjectCardsWrapper $openProject={openProject}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            openProject={openProject}
            setOpenProject={setOpenProject}
          />
        ))}
      </ProjectCardsWrapper>
      {openProject && (
        <ProjectInformationContainer>
          <CloseButton onClick={() => setOpenProject("")}>
            {"\u2716"}
          </CloseButton>
          <CarouselWrapper>
            {data[openProject].images.map((img, index) => (
              <CarouselImage
                src={img}
                $index={index}
                $activeImageNumber={activeImageNumber}
                $numberOfImages={numberOfImages}
              />
            ))}
            <ButtonLeft
              onClick={() => setActiveImageNumber(activeImageNumber - 1)}
            >
              <LeftArrow />
            </ButtonLeft>
            <ButtonRight
              onClick={() => setActiveImageNumber(activeImageNumber + 1)}
            >
              <RightArrow />
            </ButtonRight>
            <DotButtonsContainer>
              {data[openProject].images.map((_, i) => (
                <DotButton
                  key={i}
                  onClick={() => setActiveImageNumber(i)}
                  $isActive={activeImageNumber % numberOfImages === i}
                />
              ))}
            </DotButtonsContainer>
          </CarouselWrapper>

          <ProjectTitle>{data[openProject].title}</ProjectTitle>
        </ProjectInformationContainer>
      )}
    </ProjectsPageContainer>
  );
}

export default ProjectsPage;
