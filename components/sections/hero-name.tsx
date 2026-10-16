"use client";

import { motion, MotionConfig } from "motion/react";
import { introName } from "@/lib/intro";

type Props = {
  firstName: string;
  lastName: string;
};

// h1 del hero. Sin máscara: sube con un spring (intro-name) al mismo tiempo que el nav.
// reducedMotion="user": con prefers-reduced-motion no hay desplazamiento, solo aparece.
export function HeroName({ firstName, lastName }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.h1
        id="hero-name"
        initial={introName.initial}
        animate={introName.animate}
        transition={introName.transition}
        className="text-display-xl text-text"
      >
        <span className="block md:inline">{firstName}</span>{" "}
        <span className="block md:inline">{lastName}</span>
      </motion.h1>
    </MotionConfig>
  );
}
