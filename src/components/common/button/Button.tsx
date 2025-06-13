import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "m" | "l" | "xl";
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "m",
  icon,
  className = "",
}) => {
  const variantClass =
    variant === "primary"
      ? "bg-[#F71F27] text-white hover:bg-red-600"
      : "bg-white text-[#F71F27] border border-[#F71F27] hover:bg-gray-100";

  const sizeClass = {
    sm: "px-3 py-1.5 text-xs",
    m: "px-4 py-2 text-sm",
    l: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  }[size];

  return (
    <button
      className={`block mt-3 rounded-full font-bold transition duration-300 shadow-lg text-center cursor-pointer flex items-center justify-center ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="inline mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;