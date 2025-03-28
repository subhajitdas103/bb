
import React from "react";
import { Facebook, Mail } from "lucide-react";
import { GoogleIcon } from "./icons/GoogleIcon";

const SocialAuth = () => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <GoogleIcon className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" />
      <Facebook className="w-6 h-6 text-[#1877F2] cursor-pointer hover:opacity-80 transition-opacity" />

    </div>
  );
};

export default SocialAuth;
