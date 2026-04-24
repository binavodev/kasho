"use client";

import { motion, useReducedMotion } from "framer-motion";

type LegalMainProps = {
  children: React.ReactNode;
  className: string;
};

/**
 * Misma página legal sin bucles: una sola animación de entrada al montar.
 */
export function LegalMain({ children, className }: LegalMainProps): React.ReactElement {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.main
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
      }
    >
      {children}
    </motion.main>
  );
}
