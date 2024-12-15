import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps } from "./model";

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  defaultValue,
  minimumValue,
  icon,
  width,
  className
}) => {
  return (
    <div className="w-full flex items-center">
      <div className={`wrapper w-full relative inline-block mx-auto ${width}`}>
        <input
          type={type}
          className={`w-full py-3 px-6 pl-10 text-md rounded-lg border my-5 placeholder:text-gray-400 border-pink-200 shadow-inner-lg focus:border-pink-300 focus:outline-none focus:shadow-lg transition-all duration-500 ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          min={minimumValue}
        />
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute text-sm left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
