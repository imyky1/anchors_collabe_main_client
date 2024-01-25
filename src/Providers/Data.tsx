import React, { createContext, useContext } from "react";
import axios from "axios";

// interfaces ---------------------------
interface DataProviderProps {
  children: React.ReactNode;
}

interface DataContextProps {
  getDataFromType: (type:string) => Promise<[]>
}
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const StaticDataContext = createContext<DataContextProps | null>(null);

export const useStaticData = () => {
  return useContext(StaticDataContext);
};

export const StaticDataProvider: React.FC<DataProviderProps> = (props) => {

  // route-1 . Check Coupon Code ---------------------
  const getDataFromType = async (type: string) => {
    const result = await axios.get(`${host}/master/getData?type=${type}`);

    if (result.data.success) {
      return result?.data?.data ;
    } else {
      alert("Error while fetching data");
    }
  };

  return (
    <StaticDataContext.Provider value={{ getDataFromType }}>
      {props?.children}
    </StaticDataContext.Provider>
  );
};
