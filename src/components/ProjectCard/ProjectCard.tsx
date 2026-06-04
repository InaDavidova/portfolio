import { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  CardCordinates,
  CardWrapper,
  StyledButton,
  StyledCard,
} from "./ProjectCard.styled";
import { ProjectKey } from "../../utils/data";

interface ProjectCardProps {
  project: ProjectKey;
  openProject: ProjectKey | "";
  setOpenProject: (project: ProjectKey | "") => void;
  isVisible: boolean;
  index: number;
}

const DEFAULT_CORDINATES: CardCordinates = { rx: 0, ry: 0, bx: 25, by: 80 };
const MIN_CARD_WIDTH = 360;
const LARGE_SCREEN_BREAKPOINT = 2560;

function getCardSize(
  isProjectOpen: boolean,
  viewportWidth: number
): { width: number; height: number } {
  let width: number;
  if (isProjectOpen) {
    width = viewportWidth >= LARGE_SCREEN_BREAKPOINT ? 250 : 210;
  } else {
    width = Math.max(viewportWidth / 4, MIN_CARD_WIDTH);
  }
  return { width, height: (width / 3) * 2 };
}

function ProjectCard({
  project,
  openProject,
  setOpenProject,
  isVisible,
  index,
}: ProjectCardProps) {
  const [cordinates, setCordinates] = useState<CardCordinates>(
    DEFAULT_CORDINATES
  );
  const [viewportWidth, setViewportWidth] = useState<number>(
    () => window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width: cardWidth, height: cardHeight } = useMemo(
    () => getCardSize(Boolean(openProject), viewportWidth),
    [openProject, viewportWidth]
  );

  useEffect(() => {
    setCordinates(DEFAULT_CORDINATES);
  }, [openProject]);

  const resetCordinates = () => setCordinates(DEFAULT_CORDINATES);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = -((e.clientX - rect.left) - cardWidth / 2) / 24;
    const y = ((e.clientY - rect.top) - cardHeight / 2) / 24;
    setCordinates({
      rx: y.toFixed(2),
      ry: x.toFixed(2),
      bx: 25 - Number((y / 2).toFixed(2)),
      by: 80 - Number((x / 2).toFixed(2)),
    });
  };

  const handleCardClick = () => {
    if (openProject !== project) {
      setOpenProject(project);
    }
  };

  return (
    <CardWrapper onMouseLeave={resetCordinates}>
      <StyledCard
        $cordinates={cordinates}
        $height={cardHeight}
        $width={cardWidth}
        $project={project}
        $openProject={openProject}
        $isVisible={isVisible}
        $index={index}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
      >
        {!openProject && (
          <StyledButton
            type="button"
            onClick={() => setOpenProject(project)}
          >
            View More
          </StyledButton>
        )}
      </StyledCard>
    </CardWrapper>
  );
}

export default ProjectCard;
