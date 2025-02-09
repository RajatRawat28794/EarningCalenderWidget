// import React from "react";

// interface LogoProps {
//   src?: string;
//   alt: string;
//   loading?: "lazy" | "eager";
// }

// const Logo: React.FC<LogoProps> = ({ src, alt, loading="lazy" }) => { 
//   return src ? (
//     <img src={src} alt={alt} className="w-16 h-16 object-contain" loading={loading} onError={(e) => (e.currentTarget.style.display = "none")} />
//   ) : null;
// };

// export default Logo;




import React from "react";

interface LogoProps {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
}

const Logo: React.FC<LogoProps> = ({ src, alt, loading = "lazy" }) => {
  return (
    <img
      src={src || "/fallback-logo.svg"} // ✅ Fallback image if src is missing
      alt={alt}
      className="w-16 h-16 object-contain transition-opacity duration-300 ease-in-out"
      loading={loading}
      onError={(e) => {
        e.currentTarget.src = "/fallback-logo.svg"; // ✅ Prevents broken images
        e.currentTarget.style.opacity = "0.5"; // ✅ Dims fallback image for distinction
      }}
    />
  );
};

export default React.memo(Logo); // ✅ Prevents unnecessary re-renders
