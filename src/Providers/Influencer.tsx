import axios from "axios";
import { createContext, useContext } from "react";

// interfaces ---------------------------
interface InfluencerProviderProps {
  children: React.ReactNode;
}

interface InfluencerContextProps {
    updatePersonalInfo:(data:{any})=>Promise<{any}>,
    getPersonalInfo:()=>Promise<{success:boolean,data?:{}}>
}

const InfluencerContext = createContext<InfluencerContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useInfluencer = () => {
    return useContext(InfluencerContext);
  };


export const InfluencerProvider: React.FC<InfluencerProviderProps> = (
  props
) => {
  // open linkedin login page -----------------------
  const updatePersonalInfo = async (data:{any}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updatePersonalData`,
        { data },
        {
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        }
      );

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in saving the data");
      } else {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

  // open linkedin login page -----------------------
  const getPersonalInfo = async () => {
    try {
      const response = await axios.get(
        `${host}/influencer/getPersonalData`,
        {
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        }
      );

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in saving the data");
      } else {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <InfluencerContext.Provider value={{updatePersonalInfo,getPersonalInfo}}>
      {props?.children}
    </InfluencerContext.Provider>
  );
};
