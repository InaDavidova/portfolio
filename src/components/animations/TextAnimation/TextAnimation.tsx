import { useEffect, useRef } from "react";
import { StyledCanvas } from "./TextAnimation.styled";
import { debounce } from "../../../utils/debounce";

import useElementOnScreen from "../../../utils/useElementOnScreen";
import { size } from "../../../theme";
import { colorTokens } from "../../../tokens";

const TITLE_TEXT = "Software Engineer";

class TextParticle {
  effect: TextEffect;
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  lastParticleColor: string;
  size: number;
  ease: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;

  constructor(effect: TextEffect, x: number, y: number, color: string) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.canvasWidth);
    this.y = Math.floor(Math.random() * this.effect.canvasHeight);
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.lastParticleColor = effect.lastParticleColor;
    this.size = effect.gap;
    this.ease = Math.random() * 0.08 + 0.01;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
  }

  draw(): void {
    if (this.color !== this.lastParticleColor) {
      this.effect.ctx.fillStyle = this.color;
    }
    this.effect.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(): void {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    const safeDistance = Math.max(this.distance, 0.0001);
    this.force = -this.effect.mouse.radius / safeDistance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

interface MouseState {
  radius: number;
  x: number;
  y: number;
}

class TextEffect {
  text: string;
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D;
  textX: number;
  textY: number;
  fontSize: number;
  particles: TextParticle[];
  lastParticleColor: string;
  gap: number;
  mouse: MouseState;

  constructor(text: string, ctx: CanvasRenderingContext2D) {
    this.text = text;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.ctx = ctx;
    this.textX = this.canvasHeight * 0.75;
    this.textY = this.canvasWidth * 0.1;
    this.fontSize =
      this.canvasWidth > size.tablet
        ? this.canvasWidth / 16
        : this.canvasWidth > size.mobileL
        ? this.canvasWidth / 10
        : this.canvasWidth / 7;
    this.particles = [];
    this.lastParticleColor = "";
    this.gap = this.canvasWidth > size.laptopL ? 2 : 1;
    this.mouse = {
      radius: 1000,
      x: 0,
      y: 0,
    };
  }

  setMousePosition(x: number, y: number): void {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  resetMousePosition(): void {
    this.mouse.x = 0;
    this.mouse.y = 0;
  }

  wrapText(): void {
    this.ctx.fillStyle = colorTokens.particleText;
    this.ctx.font = this.fontSize - 20 + "px Arial";
    this.ctx.letterSpacing = "2px";
    this.ctx.fillText(this.text, this.textY, this.textX);
    this.convertToParticles();
  }

  convertToParticles(): void {
    this.particles = [];
    const pixels = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red + "," + green + "," + blue})`;
          this.particles.push(new TextParticle(this, x, y, color));
          this.lastParticleColor = color;
        }
      }
    }
  }

  render(): void {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

interface VisibilityState {
  isVisible: boolean;
  animationFinished: boolean;
}

function TextAnimation() {
  const [canvasRef, isVisible] = useElementOnScreen<HTMLCanvasElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const isVisibleRef = useRef<VisibilityState>({
    isVisible,
    animationFinished: false,
  });

  useEffect(() => {
    isVisibleRef.current.isVisible = isVisible;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (!isVisible) {
      timeoutId = setTimeout(() => {
        isVisibleRef.current.animationFinished = true;
      }, 17000);
    } else {
      isVisibleRef.current.animationFinished = false;
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId = 0;
    let clearStartTimeout = false;
    let cleanupAnimation: (() => void) | undefined;

    const startTimeoutId = setTimeout(() => {
      if (clearStartTimeout) {
        return;
      }
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!ctx) {
        return;
      }
      const context = ctx;
      const activeCanvas = canvas;

      context.canvas.height = window.innerHeight;
      context.canvas.width = window.innerWidth;
      let isFirstRender = true;
      let prevHeight = window.innerHeight;
      let prevWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;

      let textEffect = new TextEffect(TITLE_TEXT, context);
      textEffect.wrapText();

      const handleMouseMove = (e: MouseEvent) => {
        if (e.clientY < viewportHeight) {
          const rect = activeCanvas.getBoundingClientRect();
          textEffect.setMousePosition(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
        } else {
          textEffect.resetMousePosition();
        }
      };

      function animate() {
        if (
          isVisibleRef.current.isVisible ||
          !isVisibleRef.current.animationFinished
        ) {
          context.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
          textEffect.render();
        }
        animationFrameId = window.requestAnimationFrame(animate);
      }
      animate();

      const handleResize = debounce(() => {
        if (!isFirstRender) {
          const newHeight = window.innerHeight;
          const newWidth = window.innerWidth;
          viewportHeight = newHeight;
          if (
            Math.abs(newHeight - prevHeight) < 150 &&
            Math.abs(newWidth - prevWidth) < 150
          ) {
            return;
          }
          window.cancelAnimationFrame(animationFrameId);
          context.canvas.height = newHeight;
          context.canvas.width = newWidth;
          prevHeight = newHeight;
          prevWidth = newWidth;
          textEffect = new TextEffect(TITLE_TEXT, context);
          textEffect.wrapText();

          animate();
        }
        isFirstRender = false;
      }, 100);

      handleResize();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);

      cleanupAnimation = () => {
        window.cancelAnimationFrame(animationFrameId);
        handleResize.cancel();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    }, 4700);

    return () => {
      clearStartTimeout = true;
      clearTimeout(startTimeoutId);
      cleanupAnimation?.();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);

  return <StyledCanvas ref={canvasRef} />;
}

export default TextAnimation;
