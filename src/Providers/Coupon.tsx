import React, { createContext, useContext } from "react";
import axios from "axios";

// interfaces ---------------------------
interface CouponProviderProps {
  children: React.ReactNode;
}

interface CouponContextProps {
  checkAndVerifyCouponCode: (couponCode: string) => Promise<any>;
}

const CouponContext = createContext<CouponContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useCoupon = () => {
  return useContext(CouponContext);
};

export const CouponProvider: React.FC<CouponProviderProps> = (props) => {
  // route-1 . Check Coupon Code ---------------------
  const checkAndVerifyCouponCode = async (couponCode: string) => {
    const result = await axios.post(
      `${host}/coupons/checkAndVerify?code=${couponCode}`,
      {
        type: "Influencers",
        amount: 999,
      },
      {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      }
    );

    return result.data;
  };

  return (
    <CouponContext.Provider value={{ checkAndVerifyCouponCode }}>
      {props?.children}
    </CouponContext.Provider>
  );
};
