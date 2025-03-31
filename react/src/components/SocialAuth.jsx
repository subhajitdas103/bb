import { useGoogleLogin } from "@react-oauth/google";
import { Facebook } from "lucide-react";
import axios from "axios";
import { GoogleIcon } from "./icons/GoogleIcon";
const SocialAuth = () => {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);
  
      // Fetch user info from Google (optional, backend should also verify)
      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });
  
      console.log("User Info:", userInfo.data);
  
      // Send the token to your backend for verification
      try {
        const backendResponse = await axios.post("http://127.0.0.1:8000/api/google-login", {
          access_token: response.access_token, // Send the correct token
        });
  
        console.log("Backend Response:", backendResponse.data);
      } catch (error) {
        console.error("Backend Error:", error.response?.data || error.message);
      }
    },
    onError: () => console.error("Google Login Failed"),
  });
  

  return (
    <div className  ="flex justify-center space-x-4 mt-4">
       <button
        onClick={loginWithGoogle}
        className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        <GoogleIcon className="w-6 h-6" />
        {/* <span>Sign in with Google</span> */}
      </button>


      <button
        onClick={loginWithGoogle}
        className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
      >
        <Facebook className="w-6 h-6" />
        {/* <span>Sign in with Google</span> */}
      </button>
      
    </div>
  );
};


export default SocialAuth;
