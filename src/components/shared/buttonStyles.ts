import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "light" | "outlineLight" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy-800 text-white shadow-sm hover:bg-navy-700",
  accent: "bg-amber-500 text-navy-950 shadow-sm hover:bg-amber-400",
  outline: "border border-navy-200 bg-white text-navy-800 hover:border-navy-300 hover:bg-navy-50",
  light: "bg-white text-navy-900 shadow-sm hover:bg-cream-100",
  outlineLight: "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  whatsapp: "bg-[#075E54] text-white shadow-sm hover:bg-[#0a6b60]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm sm:text-base",
  lg: "min-h-12 px-6 text-base",
};

/** Shared button look for links and buttons. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );
}
