import { Link as RouterLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  direction?: "back" | "forward";
  className?: string;
};

const Link = ({ to, children, direction, className = "" }: LinkProps) => {
  return (
    <RouterLink
      to={to}
      className={`text-gray-800 hover:text-[#F71F27] transition duration-300 flex items-center ${className}`}
    >
      {direction === "back" && <FaArrowLeft className="mr-2" />}
      <span>{children}</span>
      {direction === "forward" && <FaArrowRight className="ml-2" />}
    </RouterLink>
  );
};

export default Link;