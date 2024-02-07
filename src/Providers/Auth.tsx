import axios from "axios";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import * as CompanyEmailValidator from "company-email-validator";

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
  getBrandByEmail;
  getBrandData;
  setLoggedBrand;
  setReFetchBrandData;
  sendingOTPFeature;
  verfiyOTP;
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
            localStorage.removeItem("UserType");
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
  const getBrandByEmail = async (email) => {
    try {
      const response = await axios.get(`${host}/Brand/getBrandByEmail`, {
        params: { email }, // Pass email as a parameter
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return { Error: response.data.error };
      }
    } catch (e) {
      return { Error: e.response.data.error };
    }
  };

  const sendingOTPFeature = async (email) => {
    // var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailPattern =
      /\b[A-Za-z0-9._%+-]+@(?:gmail\.com|protonmail\.com|zoho\.com|outlook\.com|yahoo\.com|aol\.com|gmx\.com|icloud\.com|mailfence\.com|tutanota\.com|neo\.com|hubspot\.com|thunderbird\.net|titan\.com|yandex\.com|hotmail\.com|live\.com|msn\.com|fastmail\.com|mail\.com|posteo\.de|t-online\.de|bluemail\.me|hushmail\.com|rediffmail\.com|rediff\.com|redmail\.com|mailinator\.com)\b/;

    if (
      !emailPattern.test(email) ||
      CompanyEmailValidator.isCompanyEmail(email)
    ) {
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
        let otpcode = parseInt(String(json.code - 5626)) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for two minute
        return json;
      } else {
        return { Error: "Oops! Something went Wrong!" };
      }
    } else {
      return { Error: "Invalid Email! Please Enter Company Mail" };
    }
  };

  const verfiyOTP = async (otp, email, type) => {
    if (otp?.length !== 4) {
      return { Error: "Please Enter a Proper Code" };
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        return { Error: "OTP was valid for 2 minute, Please retry again" };
      } else {
        if (parseInt(otp) === parseInt(String(parseInt(code) / 562002))) {
          // alert("Verification was successfull");
          removeCookie("ccoondfe");
          if (type === "SignUp") {
            return await BrandSignUp(email);
          } else if (type === "Login") {
            return await BrandSignIn(email);
          }
        } else {
          return { Error: "Invalid Otp" };
        }
      }
    }
  };

  const BrandSignUp = async (email) => {
    try {
      const response = await axios.post(`${host}/Brand/SignUp`, { email });
      console.log(response);
      if (response.status === 200) {
        if (response.data.success) {
          setLoggedBrand(response.data.email);
          return await BrandSignIn(email);
        } else {
          // alert(response.data.error);
          return { Error: response.data.error };
        }
      } else {
        // alert(response.data.error);
        return { Error: response.data.error };
      }
    } catch (e) {
      console.log(e.response.data.error);
      return { Error: e.response.data.error };
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
          return { Error: response.data.error };
        }
      } else {
        return { Error: response.data.error };
      }
    } catch (error) {
      return { Error: error.response.data.error };
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
            localStorage.removeItem("UserType");
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
        getBrandByEmail,
        BrandSignUp,
        getBrandData,
        setReFetchBrandData,
        sendingOTPFeature,
        setLoggedBrand,
        verfiyOTP,
      }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
};
