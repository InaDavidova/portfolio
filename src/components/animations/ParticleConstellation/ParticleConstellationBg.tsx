import { useEffect } from "react";
import { StyledCanvas } from "./ParticleConstellationBg.styled";
import { debounce } from "../../../utils/debounce";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import { colorTokens } from "../../../tokens";

class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.radius = Math.random() * 1.2 + 1;
    this.vx = (Math.random() - 0.5) / 2;
    this.vy = (Math.random() - 0.5) / 2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = colorTokens.particleBlue;
    ctx.fill();
    ctx.stroke();
  }

  update(): void {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vx *= -1;
    }

    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vy *= -1;
    }
  }
}

class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  particles: Particle[];
  particlesNumber: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.particlesNumber = (this.width * this.height) / 6000;
    this.createParticles();
  }

  createParticles(): void {
    for (let i = 0; i < this.particlesNumber; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(ctx: CanvasRenderingContext2D): void {
    this.connectParticles(ctx);
    this.particles.forEach((particle) => {
      particle.draw(ctx);
      particle.update();
    });
  }

  connectParticles(ctx: CanvasRenderingContext2D): void {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a + 1; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;

        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          ctx.save();
          ctx.strokeStyle = colorTokens.particleLink;
          const opacity = 1 - distance / maxDistance;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(this.particles[a].x, this.particles[a].y);
          ctx.lineTo(this.particles[b].x, this.particles[b].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }
}

function ParticleConstellationBg() {
  const [canvasRef, isVisible] = useElementOnScreen<HTMLCanvasElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  useEffect(() => {
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
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    let animationFrameId: number | null = null;
    let isFirstRender = true;
    let prevHeight = window.innerHeight;
    let prevWidth = window.innerWidth;

    let effect = new Effect(activeCanvas);

    function animate() {
      context.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      effect.handleParticles(context);
      animationFrameId = window.requestAnimationFrame(animate);
    }

    if (isVisible) {
      animate();
    }

    const handleResize = debounce(() => {
      if (isFirstRender) {
        isFirstRender = false;
        return;
      }
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;
      if (
        Math.abs(newHeight - prevHeight) < 150 &&
        Math.abs(newWidth - prevWidth) < 150
      ) {
        return;
      }
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      context.canvas.height = newHeight;
      context.canvas.width = newWidth;
      prevHeight = newHeight;
      prevWidth = newWidth;
      effect = new Effect(activeCanvas);
      if (isVisible) {
        animate();
      }
    }, 100);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, isVisible]);

  return <StyledCanvas ref={canvasRef} />;
}

export default ParticleConstellationBg;
