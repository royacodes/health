import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "rounded-xl transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    "select-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-on-primary shadow-sm",
          "hover:bg-primary-hover hover:shadow-md",
          "focus-visible:ring-primary",
        ].join(" "),
        destructive: [
          "bg-danger text-on-danger shadow-sm",
          "hover:bg-danger/90 hover:shadow-md",
          "focus-visible:ring-danger",
        ].join(" "),
        outline: [
          "border border-border bg-transparent text-fg",
          "hover:bg-muted hover:border-border-strong",
          "focus-visible:ring-primary",
        ].join(" "),
        secondary: [
          "bg-secondary text-on-secondary shadow-sm",
          "hover:bg-muted",
          "focus-visible:ring-primary",
        ].join(" "),
        ghost: ["text-fg hover:bg-muted", "focus-visible:ring-primary"].join(" "),
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
          "focus-visible:ring-primary",
        ].join(" "),
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg",
        sm: "h-9 px-3.5 text-sm rounded-lg",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-8 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
