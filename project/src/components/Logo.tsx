import React from "react";

interface LogoProps {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
}

const Logo: React.FC<LogoProps> = ({ src, alt, loading = "lazy" }) => {
  return (
    <img
      src={src || "/fallback-logo.svg"} 
      alt={alt}
      className="w-16 h-16 object-contain transition-opacity duration-300 ease-in-out"
      loading={loading}
      onError={(e) => {
        e.currentTarget.src = "/fallback-logo.svg";
        e.currentTarget.style.opacity = "0.5";
      }}
    />
  );
};

export default React.memo(Logo);
