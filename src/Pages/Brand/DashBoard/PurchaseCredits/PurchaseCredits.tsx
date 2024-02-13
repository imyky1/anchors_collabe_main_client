import { useEffect, useState } from "react";
import { Button1, Button4 } from "../../../../Components/Buttons";
import { FaArrowRightLong } from "react-icons/fa6";
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
  const [Credits, SetCredits] = useState(null);
  const [Gst, SetGst] = useState(0);

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
    if(e.target.value < 0){
      return SetCredits(0)
    }
    SetCredits(e.target.value);
    SetAmount(e.target.value);
  };
  useEffect(() => {
    SetGst((Credits * 5 * 18) / 100);
  }, [Credits]);
  useEffect(() => {
    SetAmount(Credits * 5 + Gst);
  }, [Gst]);

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
            window.open(`Brand/DashBoard/PurchaseCredits/Success/?Credits=${Credits}`, "_self");
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
      if (Amount === 0 || !Amount) {
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
      <div className=" text-[#424242] flex flex-col w-full h-full items-center justify-center ">
        <p className="text-[40px] font-bold text-[#424242] ">
          Unlock More Influencers
        </p>
        <p className="text-center text-[14px] font-[400]">
          Invest to access top influencers for high-impact campaigns <br />
          Valid for the duration of your current plan
        </p>
        <div className="flex flex-col px-[40px] py-[20px] mt-[20px] items-center gap-[20px] rounded-[8px] border-[1px] border-solid border-[#E0E0E0]">
          <p>Choose the number of credits you want to buy</p>
          <div className="flex gap-[20px]">
            <Button4
              onClick={() => {
                SetCredits(200);
              }}
              text="200"
              icon={undefined}
              rightIcon={undefined}
              background={Credits === 200 ? "#121212" : ""}
              textColor={Credits === 200 ? "#FAFAFA" : ""}
              borderColor={undefined}
            />
            <Button4
              onClick={() => {
                SetCredits(300);
              }}
              text="300"
              icon={undefined}
              rightIcon={undefined}
              background={Credits === 300 ? "#121212" : ""}
              textColor={Credits === 300 ? "#FAFAFA" : ""}
              borderColor={undefined}
            />
            <Button4
              onClick={() => {
                SetCredits(500);
              }}
              text="500"
              icon={undefined}
              rightIcon={undefined}
              background={Credits === 500 ? "#121212" : ""}
              textColor={Credits === 500 ? "#FAFAFA" : ""}
              borderColor={undefined}
            />
            <Button4
              onClick={() => {
                SetCredits(1000);
              }}
              text="1000"
              icon={undefined}
              rightIcon={undefined}
              background={Credits === 1000 ? "#121212" : ""}
              textColor={Credits === 1000 ? "#FAFAFA" : ""}
              borderColor={undefined}
            />
            <input
              className="justify-center w-[100px] items-center px-[10px] py-[0px] flex gap-[8px] rounded-[198px] bg-transparent border-[1px] border-[#75757560]"
              type="Number"
              placeholder="custom"
              min={0}
              value={Credits}
              onChange={() => handleChange(event)}
            />
          </div>
          <p className="text-[#757575] font-[700] text-[16px] ">
            Order Summary
          </p>
          <div className="flex">
            <p className="w-[136px]">{`Cost of Credits`}</p>
            <p className="w-[40px]">:</p>
            <p>
              <b>{`₹ ${(Credits * 5) || 0}`}</b>
            </p>
          </div>
          <div className="flex">
            <p className="w-[136px]">{`GST ( 18% )`}</p>
            <p className="w-[40px]">:</p>
            <p>
              <b>{`₹ ${Gst || 0}`}</b>
            </p>
          </div>
          <div className="flex">
            <p className="w-[136px]">{`Total Amount`}</p>
            <p className="w-[40px]">:</p>
            <p>
              <b>{`₹ ${Amount || 0}`}</b>
            </p>
          </div>
          <Button1
            onClick={handlePaymentClick}
            text={`CONTINUE TO PAY ₹${Amount || 0}`}
            icon={undefined}
            rightIcon={<FaArrowRightLong />}
            background={undefined}
            textColor={undefined}
            borderColor={undefined}
          />
        </div>
      </div>
    </>
  );
};
