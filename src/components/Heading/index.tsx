import { HeadingProps } from "./model";
const StyledHeading: React.FC<HeadingProps> = ({ className, headingText }) => {
  return (
    <h3 className={`font-bold text-gray-800 my-4 ${className}`}>
      {headingText}
    </h3>
  );
};

export default StyledHeading;
