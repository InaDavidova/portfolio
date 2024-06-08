import { useState } from "react";
import ProjectCard from "../../ProjectCard/ProjectCard";
import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";
import {
  CloseButton,
  ProjectCardsWrapper,
  ProjectInformationContainer,
  ProjectsPageContainer,
} from "./ProjectsPage.styled";

function ProjectsPage() {
  const [openProject, setOpenProject] = useState("");
  const [projects] = useState([
    "planets-little-helper",
    "something 2",
    "something 3",
    "something 4",
  ]);

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
        </ProjectInformationContainer>
      )}
    </ProjectsPageContainer>
  );
}

export default ProjectsPage;
