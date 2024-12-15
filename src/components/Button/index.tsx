import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "./model";

const Button: React.FC<ButtonProps> = ({
  btnText,
  className,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`gap-2 flex items-center justify-center text-gray-500 text-sm font-normal rounded-lg bg-pink-200 hover:bg-pink-300 hover:text-white hover:shadow-lg my-4 transition-all duration-300 border ${className}`}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {btnText}
    </button>
  );
};

export default Button;
