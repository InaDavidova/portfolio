import React, { useEffect, useRef } from "react";
import { StyledCanvas } from "./ParticleConstellationBg.styled";
import { debounce } from "../../../utils/debounce";
import useElementOnScreen from "../../../utils/useElementOnScreen";

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.radius = Math.random() + 1 * 1.2;
    this.vx = (Math.random() - 0.5) / 2;
    this.vy = (Math.random() - 0.5) / 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#9cffff";
    ctx.fill();
    ctx.stroke();
  }

  update() {
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
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.particlesNumber = (this.width * this.height) / 6000;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.particlesNumber; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(ctx) {
    this.connectParticles(ctx);
    this.particles.forEach((particle) => {
      particle.draw(ctx);
      particle.update();
    });
  }

  connectParticles(ctx) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;

        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          ctx.save();
          ctx.strokeStyle = "#41816e";
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
  const [canvasRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const isVisibleRef = useRef({ isVisible });

  useEffect(() => {
    isVisibleRef.current.isVisible = isVisible;
  }, [isVisible]);

  useEffect(() => {
    if (!canvasRef) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    let animationFrameId;
    let isFirstRender = true;

    let effect = new Effect(canvas);

    function animate() {
      if ( isVisibleRef.current.isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.handleParticles(ctx);
      }
      animationFrameId = window.requestAnimationFrame(animate);
    }
    animate();

    const handleResize = debounce(() => {
      if (!isFirstRender) {
        window.cancelAnimationFrame(animationFrameId);
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
        effect = new Effect(canvas);
        animate();
      }
      isFirstRender = false;
    }, 100);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  return <StyledCanvas ref={canvasRef} />;
}

export default ParticleConstellationBg;
