/// <reference types="react-scripts" />

declare module "*.css";

// Augment CanvasRenderingContext2D with `letterSpacing` (Baseline but missing
// from older TS lib types).
interface CanvasRenderingContext2D {
  letterSpacing: string;
}
