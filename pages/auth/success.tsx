import type { NextPage } from "next";
import { useEffect } from "react";

const AuthSuccess: NextPage = () => {
  const handleRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    window.location.replace("cosign://auth?" + params.toString());
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div style={{ padding: "1rem 2rem", fontFamily: "sans-serif" }}>
      <p>Welcome to CoSign! Redirecting you back to the app...</p>
    </div>
  );
};

export default AuthSuccess;
