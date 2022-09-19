import type { NextPage } from "next";
import { useEffect } from "react";

const AuthSuccess: NextPage = () => {
  const handleRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    window.location.replace("cosign://auth" + params.toString());
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default AuthSuccess;
