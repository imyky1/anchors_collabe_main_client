import axios from "axios";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

// interfaces ---------------------------
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  handleOpenLinkedin: () => void;
  getLinkedinDatatoLogin: (token: string) => Promise<void>;
  getUserData: () => Promise<void>;
  loggedUser: loggedUser | null;
  setReFetchUserData: React.Dispatch<SetStateAction<boolean>>;
  loggedBrand: any;
  BrandSignIn;
  BrandSignUp;
  getBrandData;
  setLoggedBrand;
  setReFetchBrandData;
  sendingOTPFeature;
  verfiyOTP
}

interface loggedUser {
  name: string;
  email: string;
  activePlan: boolean;
  status: number;
  profile: string;
  is_verified: boolean;
  slug: string;
  referralCode: string;
  earlyAccess?: boolean;
  mobile: string;
  linkedinLink: string;
  eaRank?: string;
  totalChips?: number;
  featuredData?: {
    value: boolean;
    topCreatorChips?: number;
  };
  buildProfileChips?: {
    AudienceInfo?: number | null;
    PersonalInfo?: number | null;
    CollabHistory?: number | null;
    MonetizationHistory?: number | null;
    ContentInfo?: number | null;
  };
}

const AuthContext = createContext<AuthContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  // route-1 . create influencer order ---------------------
  const [loggedUser, setLoggedUser] = useState<loggedUser | null>(null);
  const [loggedBrand, setLoggedBrand] = useState(null);

  const [reFetchUserData, setReFetchUserData] = useState(false);
  const [reFetchBrandData, setReFetchBrandData] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") &&
      localStorage.getItem("UserType") === "Influencer"
    ) {
      getUserData();
    }
  }, [reFetchUserData]);
  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") &&
      localStorage.getItem("UserType") === "Brand"
    ) {
      getBrandData();
    }
  }, [reFetchBrandData]);

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
          localStorage.setItem("UserType", "Influencer");
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
            localStorage.removeItem("Usertype");
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
      window.open("/", "_self");
    }
  };

  //Brand

  const sendingOTPFeature = async (email) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(email)) {
      const response = await fetch(`${host}/email/sendOTPViaEmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email,
        }),
      });
      const json = await response.json();
      if (json?.success) {
        let otpcode = parseInt(json.code - 5626) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for two minute
        console.log(json)
        return json?.success
      }
    } else {
    }
  };

  const verfiyOTP = async (otp,email,type) => {
    if (otp?.length !== 4) {
      alert("Enter a proper code");
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        alert("OTP was valid for 2 minute, Please retry again");
      } else {
        if (parseInt(otp) === parseInt(parseInt(code) / 562002)) {
          alert("Verification was successfull");
          removeCookie("ccoondfe");
          if(type === "SignUp"){
            BrandSignUp(email)
          }
          else if(type === "Login"){
            BrandSignIn(email)
          }
          
        }else{
          alert("Invalid Otp");
        }
      }
    }
  };

  const BrandSignUp = async (email) => {
    try {
      const response = await axios.post(`${host}/Brand/SignUp`, { email });
      if (response.status === 200) {
        if (response.data.success) {
          setLoggedBrand(response.data.email);
          BrandSignIn(email)
        } else {
          alert(response.data.error);
          throw new Error(response.data.error);
        }
      } else {
        alert(response.data.error);
        throw new Error("Error in Sign Up");
      }
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  const BrandSignIn = async (email) => {
    try {
      const response = await axios.post(`${host}/Brand/SignIn`, {
        email,
      });

      if (response.status === 200) {
        if (response.data.success) {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("UserType", "Brand");
          window.open("/Brand/Welcome", "_self");
        } else {
          alert(response.data.error);
          throw new Error(response.data.error);
        }
      } else {
        alert(response.data.error);
        throw new Error("Error in login");
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
      // window.open("/", "_self");
    }
  };
  const getBrandData = async () => {
    try {
      const response = await axios.get(`${host}/Brand/getBrandData`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

      if (response.status === 200) {
        if (response.data.success) {
          return setLoggedBrand({
            ...response.data?.data,
          });
        } else {
          if (response.data?.logout) {
            console.log("Logging Out");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("Usertype");
            window.open("/", "_self");
            return;
          }
          throw new Error(response.data.error);
        }
      } else {
        // console.log("EError in fetching Brand data")
        throw new Error("Error in fetching Brand data");
      }
    } catch (error) {
      console.log(error);
      // alert("Error in fetching Brand data");
      // window.open("/", "_self");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleOpenLinkedin,
        getLinkedinDatatoLogin,
        getUserData,
        loggedUser,
        setReFetchUserData,
        loggedBrand,
        BrandSignIn,
        BrandSignUp,
        getBrandData,
        setReFetchBrandData,
        sendingOTPFeature,
        verfiyOTP
      }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
};
