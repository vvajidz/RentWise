"use client";

import { motion } from "framer-motion";
import { Home, KeyRound } from "lucide-react";

type IconType = "home" | "key";

interface FloatingIconProps {
  x: string;
  y: string;
  delay: number;
  icon: IconType;
  color?: string;
}

function FloatingIcon({ x, y, delay, icon, color }: FloatingIconProps) {
  const IconComponent = icon === "home" ? Home : KeyRound;
  return (
    <motion.div
      className="absolute opacity-20"
      style={{ left: x, top: y, color: color || "#2563eb" }}
      animate={{
        y: ["0%", "80%", "0%"],
        x: ["0%", "50%", "0%"],
        rotate: [0, 30, -30, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <IconComponent size={48} />
    </motion.div>
  );
}

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Blue houses */}
      <FloatingIcon x="5%" y="10%" delay={0} icon="home" />
      <FloatingIcon x="35%" y="20%" delay={2} icon="home" />
      <FloatingIcon x="50%" y="40%" delay={3} icon="home" />
      <FloatingIcon x="90%" y="10%" delay={6} icon="home" />

      {/* Golden houses */}
      <FloatingIcon x="25%" y="60%" delay={2.5} icon="home" color="#FFD700" />
      <FloatingIcon x="70%" y="60%" delay={4.5} icon="home" color="#FFD700" />
      <FloatingIcon x="85%" y="75%" delay={5.5} icon="home" color="#FFD700" />

      {/* Keys */}
      <FloatingIcon x="15%" y="50%" delay={1.5} icon="key" color="#9ca3af" />
      <FloatingIcon x="55%" y="70%" delay={3.5} icon="key" color="#9ca3af" />
      <FloatingIcon x="75%" y="20%" delay={5} icon="key" color="#9ca3af" />
    </div>
  );
}
