import useElementOnScreen from "../../../utils/useElementOnScreen";
import { StyledH1 } from "./AnimatedTitle.styled";

interface AnimatedTitleProps {
  text: [string, string];
}

function AnimatedTitle({ text }: AnimatedTitleProps) {
  const [elementRef, isVisible] = useElementOnScreen<HTMLHeadingElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <StyledH1 ref={elementRef} $isVisible={isVisible} $text={text}>
      <span>{text[0]}</span> <span>{text[1]}</span>
    </StyledH1>
  );
}

export default AnimatedTitle;
