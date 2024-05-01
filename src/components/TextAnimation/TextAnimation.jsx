import React, { useEffect, useRef, useState } from "react";
import { StyledCanvas } from "./TextAnimation.styled";
import { debounce } from "../../utils/debounce";

class TextParticle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = Math.random() * this.effect.canvasHeight;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = effect.gap;
    this.ease = Math.random() * 0.08 + 0.01;
  }
  draw() {
    this.effect.ctx.fillStyle = this.color;
    this.effect.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}

class TextEffect {
  constructor(text, ctx) {
    this.text = text;
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.ctx = ctx;
    this.textX = this.canvasHeight * 0.75;
    this.textY = this.canvasWidth * 0.1;
    this.fontSize =
      this.canvasWidth > 736 ? this.canvasWidth / 16 : this.canvasWidth / 12;
    this.particles = [];
    this.gap = this.canvasWidth > 1440 ? 3 : 1;
  }

  wrapText() {
    this.ctx.fillStyle = "#b7fae6";
    this.ctx.font = this.fontSize - 20 + "px Helvetica";
    this.ctx.letterSpacing = "2px";
    this.ctx.fillText(this.text, this.textY, this.textX);
    this.convertToParticles();
  }

  convertToParticles() {
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
        }
      }
    }
  }

  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

function TextAnimation() {
  const canvasRef = useRef(null);
  const [text] = useState("Software Engineer");

  useEffect(() => {
    setTimeout(() => {
      if (!canvasRef) {
        return;
      }
      const canvas = canvasRef.current;
      const ctx = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });
      ctx.canvas.height = window.innerHeight;
      ctx.canvas.width = window.innerWidth;
      let isFirstRender = true;
      let animationFrameId;

      let textEffect = new TextEffect(text, ctx);
      textEffect.wrapText();

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textEffect.render();
        animationFrameId = window.requestAnimationFrame(animate);
      }
      animate();

      const handleResize = debounce(() => {
        if (!isFirstRender) {
          window.cancelAnimationFrame(animationFrameId);
          ctx.canvas.height = window.innerHeight;
          ctx.canvas.width = window.innerWidth;
          textEffect = new TextEffect(text, ctx);
          textEffect.wrapText();

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
    }, 4700);
  }, [canvasRef, text]);

  return <StyledCanvas ref={canvasRef} />;
}

export default TextAnimation;
