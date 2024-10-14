import { useEffect, useState } from "react";
import { CardWrapper, StyledButton, StyledCard } from "./ProjectCard.styled";

function ProjectCard({
  project,
  openProject,
  setOpenProject,
  isVisible,
  index,
}) {
  const [cordinates, setCordinates] = useState({});
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const screnWidth = window.innerWidth;
    if (openProject) {
      let width = screnWidth >= 2560 ? 250 : 210;
      let height = (width / 3) * 2;
      setCardWidth(width);
      setCardHeight(height);
    } else {
      let width = screnWidth / 4;
      if (width < 360) width = 360;
      setCardWidth(width);
      setCardHeight((width / 3) * 2);
    }
    setCordinates({
      rx: 0,
      ry: 0,
      bx: 25,
      by: 80,
    });
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
