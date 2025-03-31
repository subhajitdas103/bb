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
  
  const handleGoogleClick = () => {
    setDialogOpen(true);
  };
  
  const handleRoleSelect = (role) => {
    // Close the dialog
    setDialogOpen(false);
    
    // Simulate authenticating with Google with the selected role
    toast({
      title: `Authenticating as ${role === "leader" ? "Group Leader" : "Group User"}`,
      description: "Redirecting to Google authentication...",
    });
    
    // This is where you would typically redirect to Google OAuth
    // with the role stored in the session or as a URL parameter
    console.log(`Selected role: ${role}`);
       // Trigger Google login after role selection
       loginWithGoogle();
    // Simulate API request with a delay to show the toast
    setTimeout(() => {
      // In a real application, this would be handled by the OAuth callback
      console.log("Google authentication completed");
    }, 1500);
  };
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
      <>
      <div className="flex justify-center space-x-4 mt-4">
        <GoogleIcon 
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
