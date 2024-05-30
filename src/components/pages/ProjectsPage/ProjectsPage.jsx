import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";
import { ProjectsPageContainer } from "./ProjectsPage.styled";

function ProjectsPage() {
  return (
    <ProjectsPageContainer id="projects">
      <AnimatedTitle text={["My", "Projects"]} />
    </ProjectsPageContainer>
  );
}

export default ProjectsPage;
