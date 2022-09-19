import type { NextPage } from "next";
import { useEffect } from "react";

const AuthSuccess: NextPage = () => {
  const handleRedirect = () => {
    console.log("Called");
    window.location.replace("cosign://auth");
  };

  useEffect(() => {
    console.log("Called two");
    handleRedirect();
  }, []);

  return (
    <div>
      <p>Login success</p>
    </div>
  );
};

export default AuthSuccess;
