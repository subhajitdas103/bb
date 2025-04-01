import { useGoogleLogin } from "@react-oauth/google";
import { Facebook } from "lucide-react";
import axios from "axios";
import { GoogleIcon } from "./icons/GoogleIcon";
import RoleSelectionDialog from "./RoleSelectionDialog";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

const SocialAuth = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");  // Store the selected role

  const handleGoogleClick = () => {
    setDialogOpen(true);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);  // Store selected role
    setDialogOpen(false);  // Close the role selection dialog

    toast({
      title: `Authenticating as ${role === "leader" ? "Group Leader" : "Group User"}`,
      description: "Redirecting to Google authentication...",
    });

    // Trigger Google login after role selection
    loginWithGoogle();
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Success:", response);

      // Fetch user info from Google (optional, backend should also verify)
      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });

      console.log("User Info:", userInfo.data);

      // Send the token and user_type (role) to your backend for verification
      try {
        const backendResponse = await axios.post("http://127.0.0.1:8000/api/google-login", {
          access_token: response.access_token,  // Send the correct token
          user_type: selectedRole,  // Send the selected role to the backend
        });

        console.log("Backend Response:", backendResponse.data);
      } catch (error) {
        console.error("Backend Error:", error.response?.data || error.message);
      }
    },
    onError: () => console.error("Google Login Failed"),
  });

  return (
    <>
      <div className="flex justify-center space-x-4 mt-4">
        <GoogleIcon
          className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleGoogleClick}
        />
        <Facebook
          className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleGoogleClick}
        />
      </div>

      <RoleSelectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRoleSelect={handleRoleSelect}
      />
    </>
  );
};

export default SocialAuth;
