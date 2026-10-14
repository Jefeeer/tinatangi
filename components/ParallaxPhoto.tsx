"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Photo as PhotoData } from "@/content/gallery";
import { Photo } from "./Photo";

/** Photo with a gentle parallax (max 8% travel). Transforms only. Static for reduced motion. */
export function ParallaxPhoto({ photo, sizes, className = "", position = "50% 50%" }: { photo: PhotoData; sizes: string; className?: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} data-reveal="photo" className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 scale-[1.1]" style={reduce ? undefined : { y }}>
        <Photo photo={photo} sizes={sizes} style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}
