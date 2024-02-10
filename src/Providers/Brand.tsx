import axios from "axios";
import { createContext, useContext } from "react";

const BrandContext = createContext(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useBrand = () => {
  return useContext(BrandContext);
};

export const BrandProvider = (props) => {
  //UpdateBrandInfo
  const UpdateBrandInfo = async (data) => {
    try {
      const response = await axios.post(
        `${host}/Brand/info`,
        { ...data },
        {
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        }
      );
      if (response.status !== 200) {
        return { Error: response.data.error };
      } else {
        return response.data;
      }
    } catch (e) {
      return { Error: e.response.data.error };
    }
  };

  //UpdatebrandMarketing
  const UpdateBrandMarketingInfo = async (data) => {
    try {
      const response = await axios.post(
        `${host}/Brand/marketingInfo`,
        { ...data },
        {
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        }
      );
      if (response.status !== 200) {
        return { Error: response.data.error };
      } else {
        return response.data;
      }
    } catch (e) {
      return { Error: e.response.data.error };
    }
  };
  const getBrandInfo = async () => {
    try {
      const response = await axios.get(`${host}/Brand/info`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        return { Error: response.data.error };
      } else {
        return response.data;
      }
    } catch (error) {
      return { Error: error.response.data.error };
    }
  };

  const getBrandMarketinginfo = async () => {
    try {
      const response = await axios.get(`${host}/influencer/marketingInfo`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in getting the data");
      } else {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };
  const getAllInfluencersData = async () => {
    try {
      const response = await axios.get(`${host}/Brand/getAllInfluencers`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        return { Error: response.data.error };
      } else {
        return response.data;
      }
    } catch (error) {
      return { Error: error.response.data.error };
    }
  };
  const getInfluncerWithCredits = async (influencerID) => {
    try {
      const response = await axios.post(
        `${host}/Brand/getInfluencer/${influencerID}`,
        {},
        {
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        }
      );
      if (response.status !== 200) {
        return { Error: response.data.error };
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { Error: error.response.data.error };
    }
  };

  return (
    <BrandContext.Provider
      value={{
        UpdateBrandInfo,
        UpdateBrandMarketingInfo,
        getBrandInfo,
        getBrandMarketinginfo,
        getAllInfluencersData,
        getInfluncerWithCredits,
      }}
    >
      {props.children}
    </BrandContext.Provider>
  );
};
