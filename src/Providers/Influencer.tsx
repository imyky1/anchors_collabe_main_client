import axios from "axios";
import { createContext, useContext } from "react";
import { useGeneralSettings } from "./General";

// interfaces ---------------------------
interface InfluencerProviderProps {
  children: React.ReactNode;
}

interface InfluencerContextProps {
  updatePersonalInfo: (data: {}) => Promise<{ any }>;
  updateCollabInfo: (data: []) => Promise<{ any }>;
  updateMonetizationInfo: (data: []) => Promise<{ any }>;
  updateContentInfo: (data: {}) => Promise<{ any }>;
  updateAudienceInfo: (data: {}) => Promise<{ any }>;
  updateWishlist: (data: {}) => Promise<{ any }>;
  uploadInfluencerImages: (data: {}) => Promise<{ any }>;
  uploadCompanyImages: (data: {}) => Promise<{ any }>;
  saveTempBrandData: (data: {}) => Promise<{ any }>;
  SaveUserInfo: (data: {}) => Promise<{ any }>;
  SentMessageFromSNS: (number: string) => Promise<{ any }>;
  getPersonalInfo: () => Promise<{ success: boolean; data?: {} }>;
  getInfluencerInfoFromSlug: (slug:string) => Promise<{ success: boolean; data?: {}}>;
  getBrandWishlist: () => Promise<{ success: boolean; data?: {} }>;
}

const InfluencerContext = createContext<InfluencerContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useInfluencer = () => {
  return useContext(InfluencerContext);
};

export const InfluencerProvider: React.FC<InfluencerProviderProps> = (
  props
) => {

  const generalState = useGeneralSettings()

  // update personal info -----------------------
  const updatePersonalInfo = async (data: {}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updatePersonalData`,
        { ...data,chipsCredit:generalState.SidebarChipsCount.one},
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

  // update personal info -----------------------
  const updateCollabInfo = async (data: []) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updateCollabHistory`,
        { data,chipsCredit:generalState.SidebarChipsCount.two },
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

  // update personal info -----------------------
  const updateMonetizationInfo = async (data: []) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updateMonetizationHistory`,
        { data, chipsCredit:generalState.SidebarChipsCount.three },
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

  // update personal info -----------------------
  const updateContentInfo = async (data: {}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updateContentInfo`,
        { ...data ,chipsCredit:generalState.SidebarChipsCount.four },
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

  // update personal info -----------------------
  const updateAudienceInfo = async (data: {}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updateAudienceInfo`,
        { ...data,chipsCredit:generalState.SidebarChipsCount.five },
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

  // update personal info -----------------------
  const updateWishlist = async (data: {}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/updateWishlist`,
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
      throw new Error(error);
    }
  };

  // update personal info -----------------------
  const saveTempBrandData = async (data: {}) => {
    try {
      const response = await axios.post(
        `${host}/influencer/saveBrandData`,
        { ...data }
      );

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in saving the data");
      } else {
        return response.data;
      }
    } catch (error) {
      alert("Error in saving the data, Please try again !!!");
    }
  };

  // get personal info -----------------------
  const getPersonalInfo = async () => {
    try {
      const response = await axios.get(`${host}/influencer/getPersonalData`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

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

  // get personal info -----------------------
  const getInfluencerInfoFromSlug = async (slug:string) => {
    try {
      const response = await axios.get(`${host}/influencer/getPersonalDataFromSlug?slug=${slug}`);

      // Check if the response contains the LinkedIn authorization URL
      if (response.status !== 200) {
        throw new Error("Error in fetching the Page");
      } else {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

  // get personal info -----------------------
  const getBrandWishlist = async () => {
    try {
      const response = await axios.get(`${host}/influencer/getBrandWishlist`, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

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

  // get personal info -----------------------
  const uploadInfluencerImages = async (data) => {
    try {
      const response = await axios.post(`${host}/upload/influencerdata`, data, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

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

  // get personal info -----------------------
  const uploadCompanyImages = async (data) => {
    try {
      const response = await axios.post(`${host}/upload/companydata`, data, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

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

  // Update the user info --------------------------
  const SaveUserInfo = async (data) => {
    try {
      const response = await axios.post(`${host}/influencer/saveinfo`, data, {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      });

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

  const SentMessageFromSNS = async (number) => {
    try {
      const response = await axios.get(`${host}/influencer/sendMsg?message=Mobile Number&number=${number}&subject=Anchors`);

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
    <InfluencerContext.Provider
      value={{
        updatePersonalInfo,
        getPersonalInfo,
        updateCollabInfo,
        updateMonetizationInfo,
        updateAudienceInfo,
        updateContentInfo,
        uploadInfluencerImages,
        uploadCompanyImages,
        updateWishlist,
        getBrandWishlist,
        SaveUserInfo,
        SentMessageFromSNS,
        getInfluencerInfoFromSlug,
        saveTempBrandData
      }}
    >
      {props?.children}
    </InfluencerContext.Provider>
  );
};
