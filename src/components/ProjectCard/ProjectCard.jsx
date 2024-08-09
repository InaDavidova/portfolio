import { useEffect, useState } from "react";
import { CardWrapper, StyledButton, StyledCard } from "./ProjectCard.styled";

function ProjectCard({ project, openProject, setOpenProject, isVisible, index }) {
  const [cordinates, setCordinates] = useState({
    rx: 0,
    ry: 0,
    bx: 25,
    by: 80,
  });
  const [cardWidth, setCardWidth] = useState(390);
  const [cardHeight, setCardHeight] = useState(260);

  useEffect(() => {
    if (openProject) {
      setCardWidth(210);
      setCardHeight(140);
    } else {
      setCardWidth(390);
      setCardHeight(260);
    }
    setCordinates({
      rx: 0,
      ry: 0,
      bx: 25,
      by: 80,
    })
  }, [openProject]);

  return (
    <CardWrapper
      onMouseLeave={() => setCordinates({ rx: 0, ry: 0, bx: 25, by: 80 })}
    >
      <StyledCard
        $cordinates={cordinates}
        $height={cardHeight}
        $width={cardWidth}
        $project={project}
        $openProject={openProject}
        $isVisible={isVisible}
        $index={index}
        onClick={() => {
          if (openProject && openProject !== project) {
            setOpenProject(project);
          }
        }}
        onMouseMove={(e) => {
          if (e.target.localName === "button") {
            return;
          }
          const x = -(e.nativeEvent.offsetX - cardWidth / 2) / 3 / 8;
          const y = (e.nativeEvent.offsetY - cardHeight / 2) / 3 / 8;
          setCordinates({
            rx: y.toFixed(2),
            ry: x.toFixed(2),
            bx: 25 - (y / 2).toFixed(2),
            by: 80 - (x / 2).toFixed(2),
          });
        }}
      >
        {!openProject && (
          <StyledButton onClick={() => setOpenProject(project)}>
            View More
          </StyledButton>
        )}
      </StyledCard>
    </CardWrapper>
  );
}

export default ProjectCard;
