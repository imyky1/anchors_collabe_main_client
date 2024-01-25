import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// interfaces ---------------------------
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  handleOpenLinkedin: () => void;
  getLinkedinDatatoLogin: (token: string) => Promise<void>;
  getUserData: () => Promise<void>;
  loggedUser: loggedUser | null;
}

interface loggedUser{
  name:string,
  email:string,
  activePlan:boolean,
  status:number,
  profile:string,
  is_verified:boolean,
  slug:string
}

const AuthContext = createContext<AuthContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  // route-1 . create influencer order ---------------------
  const [loggedUser, setLoggedUser] = useState<loggedUser | null>(null);

  const [reFetchUserData, setReFetchUserData] = useState(false);

  useEffect(() => {
    // GetUserData();
  }, [reFetchUserData]);

  // open linkedin login page -----------------------
  const handleOpenLinkedin = async () => {
    try {
      const response = await axios.get(`${host}/auth/linkedin`);

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in login with linkedin");
      } else {
        window.location.href = response.data.redirectURL;
      }
    } catch (error) {
      alert(error);
    }
  };

  // fetches the linkedin user data -------
  const getLinkedinDatatoLogin = async (token: string) => {
    const response = await axios.get(
      `${host}/auth/linkedin/success?token=${token}`
    );

    console.log(response);

    if (response.status === 200) {
      LoginInfluncer(
        response.data?.picture,
        response.data?.name,
        response.data?.email
      );
    } else {
      throw new Error("Error in login with linkedin");
    }
  };

  // logoin the user and saves the token in the session
  const LoginInfluncer = async (
    profile: string,
    name: string,
    email: string
  ) => {
    try {
      const response = await axios.post(`${host}/influencer/login`, {
        profile,
        name,
        email,
      });

      if (response.status === 200) {
        if (response.data.success) {
          localStorage.setItem("jwtToken", response.data.token);
          window.open("/influencer/", "_self");
        } else {
          throw new Error(response.data.error);
        }
      } else {
        throw new Error("Error in login with linkedin");
      }
    } catch (error) {
      alert(error);
      window.open("/", "_self");
    }
  };

  // fetches the user's data --------------
  const getUserData = async () => {
    try {
      const response = await axios.get(`${host}/influencer/getInfluencerData`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

      if (response.status === 200) {
        if (response.data.success) {
          return setLoggedUser({
            ...response.data?.data,
            activePlan: response.data?.activePlan,
          });
        } else {
          if (response.data?.logout) {
            console.log("Logging Out");
            localStorage.removeItem("jwtToken");
            window.open("/", "_self");
            return;
          }
          throw new Error(response.data.error);
        }
      } else {
        throw new Error("Error in fetching user data");
      }
    } catch (error) {
      alert("Error in fetching user data");
      localStorage.removeItem("jwtToken");
      window.open("/", "_self");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleOpenLinkedin,
        getLinkedinDatatoLogin,
        getUserData,
        loggedUser,
      }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
};
