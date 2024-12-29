import Input from "@/components/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import StyledHeading from "@/components/Heading";
import Button from "@/components/Button";
const SignUpPage = () => {
  return (
    <div className="relative py-20 bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-100 opacity-70"></div>

      {/* Content */}
      <div className="container relative z-10">
        <form
          action=""
          className="flex flex-col justify-center items-center w-4/5 md:w-3/5 mx-auto"
        >
          <StyledHeading headingText="Sign Up" className="text-2xl md:text-4xl"/>
          <Input
            type="email"
            placeholder="Enter your email address"
            icon={faUser}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            icon={faLock}
          />
          <div className="flex justify-between w-full">
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-5 w-5 ml-1 cursor-pointer accent-pink-300 "
              />
              <label htmlFor="remember" className="text-gray-500">
                Remember me
              </label>
            </div>
          </div>
          <Button btnText="SIGN UP" className="p-2" />
          <div className="text-white my-2">OR</div>
          <div>
            <Button
              btnText="Continue with Google"
              icon={faGoogle}
              className="p-2"
            />
            <Button
              btnText="Continue with Facebook"
              icon={faFacebook}
              className="p-2"
            />
          </div>
          <p className="text-gray-500">
            Already have an account?
            <a href="/loginPage" className="ml-2 text-gray-500 hover:underline">
              LOG IN
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
