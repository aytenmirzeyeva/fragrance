import StyledHeading from "@/components/Heading";

const NotFound = () => {
  return (
    <div>
      <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
        {/* Overlay */}
        <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

        {/* Content */}
        <div className="container relative z-10 h-screen">
          <StyledHeading headingText="404 Not Found" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
