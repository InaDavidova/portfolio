import React, { useEffect, useRef, useState } from "react";
import { StyledCanvas } from "./TextAnimation.styled";
import { debounce } from "../../../utils/debounce";

import useElementOnScreen from "../../../utils/useElementOnScreen";
import { size } from "../../../theme";

class TextParticle {
  constructor(effect, x, y, color) {
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

  draw() {
    if (this.color !== this.lastParticleColor) {
      this.effect.ctx.fillStyle = this.color;
    }
    this.effect.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
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
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    window.addEventListener("mousemove", (e) => {
      if (e.pageY < this.innerHeight) {
        this.mouse.x = e.pageX;
        this.mouse.y = e.offsetY;
      } else {
        this.mouse.x = 0;
        this.mouse.y = 0;
      }
    });
    window.addEventListener("resize", () => {
      this.innerHeight = window.innerHeight;
    });
  }

  wrapText() {
    this.ctx.fillStyle = "#2cffc0";
    this.ctx.font = this.fontSize - 20 + "px Arial";
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
          this.lastParticleColor = color;
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
  const [canvasRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const [text] = useState("Software Engineer");
  const isVisibleRef = useRef({ isVisible, animationFinished: false });

  useEffect(() => {
    isVisibleRef.current.isVisible = isVisible;

    if (!isVisible) {
      setTimeout(() => {
        isVisibleRef.current.animationFinished = true;
      }, 17000);
    } else {
      isVisibleRef.current.animationFinished = false;
    }
  }, [isVisible]);

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
      let prevHeight = window.innerHeight;
      let prevWidth = window.innerWidth;

      let textEffect = new TextEffect(text, ctx);
      textEffect.wrapText();

      function animate() {
        if (
          isVisibleRef.current.isVisible ||
          !isVisibleRef.current.animationFinished
        ) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          textEffect.render();
        }
        animationFrameId = window.requestAnimationFrame(animate);
      }
      animate();

      const handleResize = debounce(() => {
        if (!isFirstRender) {
          let newHeight = window.innerHeight;
          let newWidth = window.innerWidth;
          if (
            Math.abs(newHeight - prevHeight) < 150 &&
            Math.abs(newWidth - prevWidth) < 150
          ) {
            return;
          }
          window.cancelAnimationFrame(animationFrameId);
          ctx.canvas.height = newHeight;
          ctx.canvas.width = newWidth;
          prevHeight = newHeight;
          prevWidth = newWidth;
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
