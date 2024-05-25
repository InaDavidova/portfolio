import useElementOnScreen from "../../../utils/useElementOnScreen";
import { StyledH1 } from "./AnimatedTitle.styled";

function AnimatedTitle({ text }) {
  const [elementRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    treshold: 0.1,
  });

  return (
    <StyledH1 ref={elementRef} $isVisible={isVisible}>
      <span>{text[0]}</span> <span>{text[1]}</span>
    </StyledH1>
  );
}

export default AnimatedTitle;
