import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import { BASE_URL } from "@/services/baseURL";

import Input from "@/components/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import StyledHeading from "@/components/Heading";
import Button from "@/components/Button";
import { GoogleLoginRequest } from "@/types/request/google-login";
import { GoogleJWTResponse } from "@/types/response/google.jwt";
import { GeneralResponse } from "@/types/response/general-response";
import { LoginResponse } from "@/types/response/login";
const LoginPage = () => {
  const handleSuccess = (response: GoogleCredentialResponse) => {
    const userInfo = jwtDecode(
      response.credential as string
    ) as GoogleJWTResponse;
    const googleLoginRequest = new GoogleLoginRequest();
    googleLoginRequest.avatarPath = userInfo.picture;
    googleLoginRequest.deviceId = "test";
    googleLoginRequest.email = userInfo.email;
    googleLoginRequest.fullName = userInfo.name + " " + userInfo.family_name;
    googleLoginRequest.googleId = userInfo.sub;
    googleLoginRequest.platform = "web";

    console.log(googleLoginRequest);

    axios
      .post<GeneralResponse<LoginResponse>>(
        `${BASE_URL}/public/authorization/login/google`,
        googleLoginRequest
      )
      .then((res) => {
        localStorage.setItem(
          "Authorization",
          "bearer " + res.data.result.data.token
        );
      })
      .catch((err) => console.error("Error:", err));
    console.log("Google Login Success:", userInfo);
  };

  const handleFailure = () => {
    console.error("Google Login Failed:");
  };

  return (
    <div className="login bg-[url('@/assets/images/blue-and-pink-flowers-perfume-bottle.jpg')] bg-center bg-cover bg-fixed py-10 relative min-h-screen">
      <div className="overlay bg-pink-100 opacity-60 absolute w-full h-full top-0 left-0"></div>
      <div className="form-wrapper w-full absolute top-7 left-1/2 transform -translate-x-1/2 z-30 ">
        <div className="container">
          <form
            action=""
            className="flex flex-col justify-center items-center w-4/5 md:w-3/5 mx-auto"
          >
            <StyledHeading
              headingText="Log In"
              className="text-center text-4xl"
            />
            <Input
              type="email"
              placeholder="Enter your email address"
              icon={faUser}
            />
            <Input
              type="email"
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
              <a href="#" className="text-gray-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button btnText="LOG IN" className="py-2 px-3" />
            <div className="text-white my-2">OR</div>
            <div>
              <GoogleOAuthProvider clientId="247472219554-ca908o6moi06h85d2f7ln5bdcbqlte79.apps.googleusercontent.com">
                <div>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </div>
              </GoogleOAuthProvider>
              <Button
                btnText="Continue with Apple"
                icon={faApple}
                className="py-2 px-3"
              />
            </div>
            <p className="text-gray-500">
              Need an account?
              <a
                href="/signUpPage"
                className="ml-2 text-gray-500 hover:underline"
              >
                SIGN UP
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
