"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionStyle } from "framer-motion";

type RevealOpts = {
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  rotate?: number;
};

/**
 * Scroll-linked reveal. Content animates in as it enters the viewport and
 * recedes back out as it leaves — re-triggering every pass (not once).
 * Wide hold zone (0.26–0.74) keeps it fully readable through the middle.
 */
export function useReveal({ y = 120, x = 0, scale = 0.78, blur = 18, rotate = 0 }: RevealOpts = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [0, 1, 1, 0.2]);
  const yV      = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [y, 0, 0, -y * 0.55]);
  const xV      = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [x, 0, 0, x * 0.45]);
  const scaleV  = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [scale, 1, 1, scale + (1 - scale) * 0.55]);
  const rotateV = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [rotate, 0, 0, -rotate * 0.6]);
  const filter  = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [`blur(${blur}px)`, "blur(0px)", "blur(0px)", `blur(${blur * 0.6}px)`]);

  const style: MotionStyle = { opacity, y: yV, x: xV, scale: scaleV, rotate: rotateV, filter };
  return { ref, style };
}
