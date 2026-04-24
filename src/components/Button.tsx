import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "big" | "small";
type ButtonTheme = "dark" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * `dark` = dark-colored button (use on light backgrounds).
   * `light` = light-colored button (use on dark backgrounds).
   */
  theme?: ButtonTheme;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  big: "px-5 py-2.5 wv-b4 gap-2.5 min-w-[140px] wv-bold",
  small: "px-3.5 py-1.5 wv-b5 gap-2 min-w-[110px] ",
};

const variantClasses: Record<
  ButtonVariant,
  Record<ButtonTheme, { base: string; hover: string; disabled: string }>
> = {
  primary: {
    dark: {
      base: "bg-gray-50 text-white border border-transparent",
      hover: "hover:bg-black",
      disabled:
        "disabled:bg-gray-30 disabled:text-gray-40 disabled:border-transparent",
    },
    light: {
      base: "bg-white text-black border border-transparent",
      hover: "hover:bg-gray-20",
      disabled:
        "disabled:bg-gray-40 disabled:text-gray-30 disabled:border-transparent",
    },
  },
  secondary: {
    dark: {
      base: "bg-transparent text-black border border-black",
      hover: "hover:bg-gray-10",
      disabled:
        "disabled:bg-transparent disabled:text-gray-30 disabled:border-gray-20",
    },
    light: {
      base: "bg-black text-white border border-white",
      hover: "hover:bg-gray-50",
      disabled:
        "disabled:bg-black disabled:text-gray-40 disabled:border-gray-40",
    },
  },
};

const Arrow = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    aria-hidden="true"
    className={direction === "left" ? "rotate-180" : ""}
  >
    <path
      d="M1 5H13M13 5L9 1M13 5L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Button({
  variant = "primary",
  size = "big",
  theme = "dark",
  leftIcon,
  rightIcon,
  className = "",
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const styles = variantClasses[variant][theme];

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-full wv-ibmplexlooped transition-colors",
        "cursor-pointer disabled:cursor-not-allowed",
        sizeClasses[size],
        styles.base,
        styles.hover,
        styles.disabled,
        className,
      ].join(" ")}
      {...rest}
    >
      {leftIcon === undefined ? <Arrow direction="left" /> : leftIcon}
      <span className="whitespace-nowrap">{children}</span>
      {rightIcon === undefined ? <Arrow direction="right" /> : rightIcon}
    </button>
  );
}
