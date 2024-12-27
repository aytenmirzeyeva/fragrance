import { HeadingProps } from "./model";
const StyledHeading: React.FC<HeadingProps> = ({ className, headingText }) => {
  return (
    <h3
      className={`text-center text-2xl md:text-4xl font-medium text-gray-600 ${className}`}
    >
      {headingText}
    </h3>
  );
};

export default StyledHeading;
