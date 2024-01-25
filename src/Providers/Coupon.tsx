import React, { createContext, useContext } from "react";
import axios from "axios";

// interfaces ---------------------------
interface CouponProviderProps {
  children: React.ReactNode;
}

interface CouponContextProps {
  checkAndVerifyCouponCode: (couponCode: string) => {
    success?: boolean;
    error?: string;
    netToPay?: number;
  };
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
        userID: "659fbed0658615fa3dd6c5af",
        type: "Influencers",
        amount: 999,
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
