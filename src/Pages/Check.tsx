import React, { useEffect } from "react";
import LoaderOne from "../Components/Loader";
import { useAuth } from "../Providers/Auth";

const Check:React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const authState = useAuth()

  useEffect(() => {
    if (!localStorage.getItem("jwtToken") && params.get("token")) {
      authState?.getLinkedinDatatoLogin(params.get("token") ?? "")
    }
  }, []);

  return <><LoaderOne/></>
};

export default Check;
