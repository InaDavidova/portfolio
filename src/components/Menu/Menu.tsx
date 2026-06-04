import { useCallback, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);


  useScrollToAnchor();
  useClickOutside(ref, isOpen ? closeMenu : () => {} );

  return (
    <StyledMenu ref={ref}>
      <StyledMenuButton
        $isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        type="button"
      >
        <LineDiv $isOpen={isOpen} $lineNumber={1} />
        <LineDiv $isOpen={isOpen} $lineNumber={2} />
      </StyledMenuButton>
      <StyledNav id="main-navigation" aria-label="Main navigation">
        <StyledLink
          to="#home"
          $linkNumber={1}
          $isOpen={isOpen}
          $title={"Home"}
          onClick={closeMenu}
          aria-label="Go to Home section"
        >
          <GirlIcon />
        </StyledLink>
        <StyledLink
          to="#about"
          $linkNumber={2}
          $isOpen={isOpen}
          $title={"About me"}
          onClick={closeMenu}
          aria-label="Go to About me section"
        >
          <QuestionMarkIcon />
        </StyledLink>
        <StyledLink
          to="#projects"
          $linkNumber={3}
          $isOpen={isOpen}
          $title={"Projects"}
          onClick={closeMenu}
          aria-label="Go to Projects section"
        >
          <ProjectsIcon />
        </StyledLink>
        <StyledLink
          to="#contacts"
          $linkNumber={4}
          $isOpen={isOpen}
          $title={"Contacts"}
          onClick={closeMenu}
          aria-label="Go to Contacts section"
        >
          <ContactsIcon />
        </StyledLink>
      </StyledNav>
    </StyledMenu>
  );
}

export default Menu;
