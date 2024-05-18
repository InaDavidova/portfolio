import { useRef, useState } from "react";
import {
  LineDiv,
  StyledLink,
  StyledMenu,
  StyledMenuButton,
  StyledNav,
} from "./Menu.styled";
import useScrollToAnchor from "../../utils/useScrollToAnchor";
import GirlIcon from "../svgs/GirlIcon";
import QuestionMarkIcon from "../svgs/QuestionMarkIcon";
import ProjectsIcon from "../svgs/ProjectsIcon";
import ContactsIcon from "../svgs/ContactsIcon";
import useClickOutside from "../../utils/useClickOutside";

function Menu() {
  const [isOpen, setIsOpen] = useState();
  const ref = useRef();
  useScrollToAnchor();
  useClickOutside(ref, () => isOpen && setIsOpen(false));

  return (
    <StyledMenu ref={ref}>
      <StyledMenuButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <LineDiv $isOpen={isOpen} $lineNumber={1} />
        <LineDiv $isOpen={isOpen} $lineNumber={2} />
      </StyledMenuButton>
      <StyledNav>
        <StyledLink
          to="#home"
          $linkNumber={1}
          $isOpen={isOpen}
          $title={"Home"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <GirlIcon />
        </StyledLink>
        <StyledLink
          to="#about"
          $linkNumber={2}
          $isOpen={isOpen}
          $title={"About me"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <QuestionMarkIcon />
        </StyledLink>
        <StyledLink
          to="#projects"
          $linkNumber={3}
          $isOpen={isOpen}
          $title={"Projects"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ProjectsIcon />
        </StyledLink>
        <StyledLink
          to="#contacts"
          $linkNumber={4}
          $isOpen={isOpen}
          $title={"Contacts"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ContactsIcon />
        </StyledLink>
      </StyledNav>
    </StyledMenu>
  );
}

export default Menu;
