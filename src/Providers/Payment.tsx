import axios from "axios";
import { createContext, useContext } from "react";

// interfaces ---------------------------
interface paymentProviderProps {
  children: React.ReactNode;
}

interface PaymentContextProps {
  createInfluencerEasebuzzOrder: (
    paymentInfo: string,
    amount: string,
    userName: string,
    userEmail: string,
    subject: string,
    expireOn: number,
    userPhone?: string,
    couponName?: string
  ) => Promise<{
    success: boolean;
    paymentData: { status: number; data: string };
    order: string;
  }>;
  getEaseBuzz: () => Promise<string>;
  updateInfluencerOrder: (
    orderId: string,
    paymentData: { any }
  ) => Promise<{ any }>;
}

const PaymentContext = createContext<PaymentContextProps | null>(null);
const host: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export const usePayment = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider: React.FC<paymentProviderProps> = (props) => {
  // route-1 . create influencer order ---------------------
  const createInfluencerEasebuzzOrder = async (
    paymentInfo: string,
    amount: string,
    userName: string,
    userEmail: string,
    subject: string,
    expireOn: number,
    userPhone?: string,
    couponName?: string
  ) => {
    const result = await axios.post(
      `${host}/influencer/order/createOrder`,
      {
        paymentInfo,
        amount,
        userName,
        userEmail,
        userPhone,
        couponName,
        subject,
        expireOn,
      },
      {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      }
    );

    if (result.status !== 200) {
      throw new Error(
        "Some Error occured in placing order, Please try again !!!"
      );
    } else {
      if (result.data.success) {
        return result.data;
      } else {
        throw new Error(result.data?.error);
      }
    }
  };

  // route-2 . update influencer order ---------------------
  const updateInfluencerOrder = async (
    orderId: string,
    paymentData: { any }
  ) => {
    const result = await axios.post(
      `${host}/influencer/order/updateAndVerify`,
      {
        orderId,
        paymentData,
      },
      {
        headers: {
          jwtToken: localStorage.getItem("jwtToken"),
        },
      }
    );

    if (result.status !== 200) {
      throw new Error(
        "Some Error occured in placing order, Please try again !!!"
      );
    } else {
      console.log(result.data);
      if (result.data.success) {
        return result.data;
      } else {
        throw new Error(result.data?.error);
      }
    }
  };

  // route-2 . get easebuzzs ---------------------
  const getEaseBuzz = async () => {
    const result = await axios.get(`${host}/payment/getEaseBuzz`);

    return result.data.key;
  };

  return (
    <PaymentContext.Provider
      value={{
        createInfluencerEasebuzzOrder,
        getEaseBuzz,
        updateInfluencerOrder
      }}
    >
      {props?.children}
    </PaymentContext.Provider>
  );
};
