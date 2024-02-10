import React, { createContext, useContext } from "react";
import axios from "axios";

// interfaces ---------------------------
interface DataProviderProps {
  children: React.ReactNode;
}

interface DataContextProps {
  getDataFromType: (type:string) => Promise<[]>
  getCoinValueFromField: (field:string) => Promise<string>
  getLogoFromType : (field:string) => Promise<string>
}
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const StaticDataContext = createContext<DataContextProps | null>(null);

export const useStaticData = () => {
  return useContext(StaticDataContext);
};

export const StaticDataProvider: React.FC<DataProviderProps> = (props) => {

  // route-1 . get data from type ---------------------
  const getDataFromType = async (type: string) => {
    const result = await axios.get(`${host}/master/getData?type=${type}`);

    if (result.data.success) {
      return result?.data?.data ;
    } else {
      alert("Error while fetching data");
    }
  };

  const getLogoFromType = async (type: string) => {
    const result = await axios.get(`${host}/master/getLogo?type=${type}`);

    if (result.data.success) {
      return result?.data?.data ;
    } else {
      alert("Error while fetching data");
    }
  };

  // route-1 .get coin value from data ---------------------
  const getCoinValueFromField = async (field: string) => {
    const result = await axios.get(`${host}/master/getCoinValueOfField?field=${field}`);

    if (result.data.success) {
      return result?.data?.value ?? 0 ;
    } else {
      alert("Error while fetching data");
    }
  };

  return (
    <StaticDataContext.Provider value={{ getDataFromType , getCoinValueFromField, getLogoFromType }}>
      {props?.children}
    </StaticDataContext.Provider>
  );
};
