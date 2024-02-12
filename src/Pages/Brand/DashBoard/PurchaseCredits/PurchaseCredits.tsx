import React, { useEffect, useState } from "react";
import { InputField1 } from "../../../../Components/Fields";
import { Button1 } from "../../../../Components/Buttons";

import { useGeneralSettings } from "../../../../Providers/General";
import { useAuth } from "../../../../Providers/Auth";
import { usePayment } from "../../../../Providers/Payment";
import { useBrand } from "../../../../Providers/Brand";
import { toast } from "react-toastify";

export const PurchaseCredits = () => {
  const generalState = useGeneralSettings();
  const authState = useAuth();
  const paymentState = usePayment();
  const brandState = useBrand();

  const [Amount, SetAmount] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [Brand, SetBrand] = useState({});

  useEffect(() => {
    async function getBrand() {
      const result = await brandState?.getBrandInfo();
      if (result?.success) {
        SetBrand(result?.data1);
      } else {
        toast.error(result?.error);
      }
    }
    getBrand();
  }, []);

  const handleChange = (e) => {
    SetAmount(e.target.value);
  };

  // Handling the payment responses
  const handlePaymentResponse = async (
    response: {
      status: any;
      any;
    },
    orderId: string
  ) => {
    setPaymentProcessing(true);
    generalState?.setLoading(false);

    try {
      switch (response.status) {
        // 1. user cancelled the payment mode
        case "userCancelled":
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          toast.error("You cancelled the Order!", {
            position: "top-center",
            autoClose: 1000,
          });
          break;

        //2. payment dropping by user --- dropped the payment by the user
        case "dropped":
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          toast.error("You Dropped the Order!", {
            position: "top-center",
            autoClose: 1000,
          });
          break;

        //  2. payment failed due to any reasone
        case "failure":
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          toast.error(
            "Payment Failed, if amount got deducted inform us at info@anchors.in",
            {
              position: "top-center",
              autoClose: 1000,
            }
          );
          break;

        //  3. Payment pending due to any reason
        case "pending":
          // Inform lark bot about the failure
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          toast.error(
            "Payment is still pending, complete the payment to proceed,for issues inform us at info@anchors.in",
            {
              position: "top-center",
              autoClose: 1000,
            }
          );
          break;

        // 4. success payment
        case "success":
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          let result = await paymentState?.updateBrandOrder(orderId, response);
          if (result?.success) {
            toast.success("Order Placed Successfully", {
              position: "top-center",
              autoClose: 1000,
            });
            window.open("/Brand/DashBoard/PurchaseCredits", "_self");
          } else {
            throw new Error("Some error occured");
          }
          break;

        // Else all cases  -----------------
        default:
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          toast.error(
            "The order is not placed. Try again!!! ,in case of issues inform us at info@anchors.in ",
            {
              position: "top-center",
              autoClose: 1000,
            }
          );
          break;
      }
    } catch (error) {
      toast.error(
        "The order is not placed. Try again!!! ,in case of issues inform us at info@anchors.in ",
        {
          position: "top-center",
          autoClose: 1000,
        }
      );
    }
  };

  const handlePaymentClick = async () => {
    setPaymentProcessing(true);
    generalState?.setLoading(true);

    try {
      if (Amount === 0) {
        setPaymentProcessing(false);
        generalState?.setLoading(false);
        return toast.error("Please Enter Amount", {
          position: "top-center",
          autoClose: 1000,
        });
      }

      const order = await paymentState?.createBrandEasebuzzOrder(
        "BrandRechargeCredits",
        Amount,
        Brand?.CompanyName,
        authState?.loggedBrand?.email,
        "Recharge Credits",
        Date.now() + 365 * 24 * 60 * 60 * 1000,
        "6267941318"
      );

      if (Amount > 0) {
        const key = await paymentState?.getEaseBuzz();

        const easebuzzCheckout = new window.EasebuzzCheckout(key, "prod");

        const options = {
          access_key: order?.paymentData.data,
          onResponse: (response) => {
            // handling the edge cases of the response
            handlePaymentResponse(response, order?.order ?? "");
          },
          theme: "#000000", // color hex
        };

        easebuzzCheckout.initiatePayment(options);
      } else {
        window.open("/Brand/DashBoard/PurchaseCredits", "_self");
      }
    } catch (error) {
      toast.error("Error in proccessing the payment", {
        position: "top-center",
        autoClose: 1000,
      });
      setPaymentProcessing(false);
      generalState?.setLoading(false);
    }
  };
  return (
    <>
      <div>Enter Amount</div>
      <InputField1
        type="Number"
        value={Amount}
        onChange={() => handleChange(event)}
        icon={undefined}
      />
      <Button1
        onClick={handlePaymentClick}
        text="Submit"
        icon={undefined}
        rightIcon={undefined}
      />
    </>
  );
};
