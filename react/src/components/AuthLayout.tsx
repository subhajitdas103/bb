
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
// import AnimatedBackground from "./AnimatedBackground";
import bgImage from "../assets/5634934.jpg";
interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  alternateOption: {
    question: string;
    linkText: string;
    linkUrl: string;
  };
}

const AuthLayout = ({ children, title, subtitle, alternateOption }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row relative" style={{ backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover',
     backgroundPosition: 'center' 
     
     }}>
      {/* <AnimatedBackground /> */}
      
      {/* Brand Section */}
      <div className="sm:w-2/5 lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 animate-fade-in">
        <div className="max-w-md w-full space-y-8">
          <Logo size="lg" className="mx-auto sm:mx-0" />
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-slide-in-up" style={{color:"white"}}>
              Sports Tournament Prediction
            </h1>
            <p className="text-muted-foreground animate-slide-in-up" style={{animationDelay: "100ms" , color:"white"}}>
              Create or join prediction groups and compete with friends by predicting sports tournament outcomes
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="sm:w-3/5 lg:w-1/2 flex flex-col justify-center items-center" style={{padding:"5px"}}>
        <div className="glass max-w-md w-full  rounded-2xl shadow-lg animate-fade-in" style={{animationDelay: "200ms",background:"white", padding:"18px 37px"}}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">{alternateOption.question} </span>
            <Link to={alternateOption.linkUrl} className="font-medium text-accent hover:underline">
              {alternateOption.linkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
