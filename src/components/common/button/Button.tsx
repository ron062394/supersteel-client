import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  icon,
  className = "",
}) => {
  const variantClass =
    variant === "primary"
      ? "bg-[#F71F27] text-white hover:bg-red-600"
      : "bg-white text-[#F71F27] border border-[#F71F27] hover:bg-gray-100";

  return (
    <button
      className={`block mt-3 px-4 py-2 rounded-full font-bold text-sm transition duration-300 shadow-lg text-center cursor-pointer flex items-center justify-center ${variantClass} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="inline mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;