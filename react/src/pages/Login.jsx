import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/AuthLayout";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import SocialAuth from "@/components/SocialAuth";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Perform login via Axios
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // Handle the response from backend (for example, storing the token in localStorage)
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }

      toast({
        title: "Welcome back",
        description: "You've successfully logged in!",
      });

      // In a real app, you'd redirect or update state
      // For example:
      // navigate("/dashboard"); // or use React Router to redirect to another page

    } catch (error) {
      console.error("Login error", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
      alternateOption={{
        question: "Don't have an account?",
        linkText: <span style={{ color: "rgb(11 11 11)" }}>Signup</span>,
        linkUrl: "/",
      }}
    >
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" checked={formData.rememberMe} onChange={handleCheckboxChange} />
            <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative px-4 text-xs uppercase bg-background text-muted-foreground">
            or connect with
          </div>
        </div>
        
        <SocialAuth />
      </div>
    </AuthLayout>
  );
};

export default Login;
