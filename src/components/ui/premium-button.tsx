import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?:
    | "start-project"
    | "explore-services"
    | "contact-us"
    | "view-work"
    | "send-message"
    | "whatsapp"
    | "edit"
    | "filter";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  isLoading?: boolean;
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      variant = "start-project",
      size = "md",
      className,
      children,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const getVariantConfig = () => {
      switch (variant) {
        case "start-project":
          return {
            baseClasses:
              "bg-white text-black border-2 border-white font-semibold tracking-wide",
            hoverClasses: "hover:bg-black hover:text-white hover:border-white",
            animations: {
              magnetic: { distance: 15, strength: 0.3 },
              glow: { intensity: "rgba(255,255,255,0.4)", blur: 20 },
              ripple: { scale: 1.8, opacity: 0.2 },
            },
          };

        case "explore-services":
          return {
            baseClasses:
              "bg-transparent text-white border-2 border-white font-medium tracking-wide",
            hoverClasses: "hover:bg-white hover:text-black hover:border-white",
            animations: {
              magnetic: { distance: 12, strength: 0.25 },
              glow: { intensity: "rgba(255,255,255,0.2)", blur: 15 },
              ripple: { scale: 1.6, opacity: 0.15 },
            },
          };

        case "contact-us":
          return {
            baseClasses:
              "bg-white text-black border-2 border-white font-semibold tracking-wide",
            hoverClasses: "hover:bg-black hover:text-white hover:border-white",
            animations: {
              magnetic: { distance: 10, strength: 0.2 },
              glow: { intensity: "rgba(255,255,255,0.3)", blur: 12 },
              ripple: { scale: 1.4, opacity: 0.25 },
            },
          };

        case "view-work":
          return {
            baseClasses:
              "bg-transparent text-white border border-white/30 font-medium tracking-wide",
            hoverClasses:
              "hover:bg-white/10 hover:text-white hover:border-white",
            animations: {
              magnetic: { distance: 8, strength: 0.15 },
              glow: { intensity: "rgba(255,255,255,0.15)", blur: 10 },
              ripple: { scale: 1.3, opacity: 0.1 },
            },
          };

        case "send-message":
          return {
            baseClasses:
              "bg-white text-black border-2 border-white font-semibold tracking-wide",
            hoverClasses: "hover:bg-black hover:text-white hover:border-white",
            animations: {
              magnetic: { distance: 12, strength: 0.25 },
              glow: { intensity: "rgba(255,255,255,0.35)", blur: 16 },
              ripple: { scale: 1.5, opacity: 0.2 },
            },
          };

        case "whatsapp":
          return {
            baseClasses:
              "bg-green-600 text-white border-2 border-green-600 font-semibold tracking-wide",
            hoverClasses:
              "hover:bg-green-700 hover:text-white hover:border-green-700",
            animations: {
              magnetic: { distance: 14, strength: 0.3 },
              glow: { intensity: "rgba(34,197,94,0.4)", blur: 18 },
              ripple: { scale: 1.6, opacity: 0.25 },
            },
          };

        case "edit":
          return {
            baseClasses:
              "bg-transparent text-white border border-white/50 font-medium tracking-wide",
            hoverClasses:
              "hover:bg-white/5 hover:text-white hover:border-white/80",
            animations: {
              magnetic: { distance: 6, strength: 0.1 },
              glow: { intensity: "rgba(255,255,255,0.1)", blur: 8 },
              ripple: { scale: 1.2, opacity: 0.08 },
            },
          };

        case "filter":
          return {
            baseClasses:
              "bg-transparent text-white border border-white/40 font-medium tracking-wide",
            hoverClasses: "hover:bg-white hover:text-black hover:border-white",
            animations: {
              magnetic: { distance: 8, strength: 0.15 },
              glow: { intensity: "rgba(255,255,255,0.2)", blur: 10 },
              ripple: { scale: 1.3, opacity: 0.15 },
            },
          };

        default:
          return {
            baseClasses:
              "bg-white text-black border-2 border-white font-semibold tracking-wide",
            hoverClasses: "hover:bg-black hover:text-white hover:border-white",
            animations: {
              magnetic: { distance: 10, strength: 0.2 },
              glow: { intensity: "rgba(255,255,255,0.3)", blur: 12 },
              ripple: { scale: 1.4, opacity: 0.2 },
            },
          };
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-4 py-2 text-sm";
        case "md":
          return "px-6 py-3 text-base";
        case "lg":
          return "px-8 py-4 text-lg";
        case "xl":
          return "px-12 py-6 text-xl";
        default:
          return "px-6 py-3 text-base";
      }
    };

    const config = getVariantConfig();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX =
        (e.clientX - centerX) * config.animations.magnetic.strength;
      const deltaY =
        (e.clientY - centerY) * config.animations.magnetic.strength;

      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    return (
      <motion.div
        className="relative group inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-md"
          style={{
            background: config.animations.glow.intensity,
            filter: `blur(${config.animations.glow.blur}px)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        />

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${config.animations.glow.intensity} 0%, transparent 70%)`,
          }}
          animate={
            isHovered
              ? {
                  scale: [1, config.animations.ripple.scale, 1],
                  opacity: [0, config.animations.ripple.opacity, 0],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Main Button */}
        <motion.button
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            buttonRef.current = node;
          }}
          className={cn(
            "relative z-10 rounded-lg transition-all duration-300",
            "backdrop-blur-sm overflow-hidden",
            config.baseClasses,
            config.hoverClasses,
            getSizeClasses(),
            isLoading && "pointer-events-none opacity-70",
            className
          )}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          disabled={isLoading}
          {...props}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            whileHover={{
              x: "100%",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />

          {/* Text Content */}
          <span className="relative z-20 flex items-center justify-center gap-2">
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              children
            )}
          </span>

          {/* Inner Border Glow */}
          <motion.div
            className="absolute inset-[1px] rounded-[calc(0.5rem-1px)] opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
export type { PremiumButtonProps };
