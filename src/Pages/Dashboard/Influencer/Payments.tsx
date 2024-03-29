import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useCoupon } from "../../../Providers/Coupon";
import { usePayment } from "../../../Providers/Payment";
import { useGeneralSettings } from "../../../Providers/General";
import { useAuth } from "../../../Providers/Auth";


type benefitProp = {
    onClose: () => void;
  };
  
  const BenefitsPopup: React.FC<benefitProp> = ({ onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#12121280] flex items-center justify-center z-40">
        <div
          className="flex flex-col items-center gap-3 bg-white w-[400px] p-5 box-border font-public rounded-xl"
          onClick={onClose}
        >
          <h2 className="text-lg font-bold leading-7">Membership Highlights</h2>
          <h3>
            <b>Public Profile</b>: Showcase your creativity for brands to
            discover.
          </h3>
  
          <ul className="flex flex-col gap-3 list-disc w-10/12 text-[16px]">
            <li>
              <b>Exclusive Benefits</b>: Enjoy 1 year of awesome perks,
              including...
            </li>
            
                <li>
                  <b>(Coming Soon!) LinkedIn Creators Community</b>:  Network and learn from fellow creators.
                </li>
                
                <li>
                  <b>Zero Commission</b>: Keep 100% of your earnings from brand
                  collaborations.
                </li>
                <li>
                  <b>Tailored Opportunities</b>: Get matched with projects perfectly suited to your skills.
  
                </li>
            
          </ul>
  
          <button className="text-[16px] bg-[#121212] text-[#BDBDBD] py-[10px] px-10 rounded-lg mt-10 mb-6 cursor-pointer">
            Got it
          </button>
        </div>
      </div>
    );
  };


const Payments: React.FC = () => {
    const [openBenefits, setOpenBenefits] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCoup, setAppliedCoup] = useState(false);
  const [amountToPay, setAmountToPay] = useState(999);
  const couponState = useCoupon();
  const paymentState = usePayment();
  const generalState = useGeneralSettings()
  const authState = useAuth()
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleCouponCodeSubmit = async () => {
    const result = await couponState?.checkAndVerifyCouponCode(
      coupon.toUpperCase()
    );
    if (result?.success) {
      setAppliedCoup(true);
      setAmountToPay(result?.netToPay);
    } else {
      alert(result?.error);
    }
  };

  // Handling the payment responses
  const handlePaymentResponse = async (response: { any }, orderId: string) => {
    setPaymentProcessing(true);
    generalState?.setLoading(false);

    try {
      switch (response.status) {
        // 1. user cancelled the payment mode
        case "userCancelled":
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          alert(
            "It is a paid service, for using it you have to pay the one time payment"
          );
          break;

        //2. payment dropping by user --- dropped the payment by the user
        case "dropped":
          setPaymentProcessing(false);
          generalState?.setLoading(false);
          alert(
            "It is a paid service, for using it you have to pay the one time payment"
          );
          break;

        //  2. payment failed due to any reasone
        case "failure":
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          alert(
            "Payment Failed, if amount got deducted inform us at info@anchors.in"
          );

          break;

        //  3. Payment pending due to any reason
        case "pending":
          // Inform lark bot about the failure
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          alert(
            "Payment is still pending, complete the payment to proceed,for issues inform us at info@anchors.in"
          );
          break;

        // 4. success payment
        case "success":
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          let result = await paymentState?.updateInfluencerOrder(
            orderId,
            response
          );
          if (result?.success) {
            window.open("/influencer/activationSuccess", "_self");
          } else {
            throw new Error("Some error occured");
          }
          break;

        // Else all cases  -----------------
        default:
          setPaymentProcessing(false);
          generalState?.setLoading(false);

          alert(
            "The order is not placed. Try again!!! ,in case of issues inform us at info@anchors.in "
          );
          break;
      }
    } catch (error) {
      alert(
        "The order is not placed. Try again!!! ,in case of issues inform us at info@anchors.in "
      );
    }
  };

  const handlePaymentClick = async () => {
    if (coupon !== "" && !appliedCoup) {
      alert("Verify the coupon first");
      return;
    }

    setPaymentProcessing(true);
    generalState?.setLoading(true);

    try {
      const order = await paymentState?.createInfluencerEasebuzzOrder(
        "InfluencerFirstPay",
        "999",
        authState?.loggedUser?.name,
        authState?.loggedUser?.email,
        "Joining Fees",
        Date.now() + 365 * 24 * 60 * 60 * 1000,
        "6267941318",
        appliedCoup ? coupon : undefined
      );

      if (amountToPay > 0) {
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
        window.open("/influencer/activationSuccess", "_self");
      }
    } catch (error) {
      alert("Error in proccessing the payment");
      setPaymentProcessing(false);
      generalState?.setLoading(false);
    }
  };


  return (

    <>
    {openBenefits && <BenefitsPopup onClose={()=>{setOpenBenefits(false)}}/>}

    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <h1 className="text-[#424242] font-public text-4xl font-bold">Time to Go Live!</h1>
      <p className="text-[#757575] text-[16px] text-center">
        Activate your profile with a Membership Plan to be <br/>visible and attract
        brands for collaborations
      </p>

        <div className="w-[373px] h-[1px] bg-[#BDBDBD]"></div>

      <section className="flex flex-col items-center">
        <div className="py-3 px-5 border border-[#757575] inline-block text-sm rounded-[1000px] text-[#424242]">
          Membership Fee: <b>₹999/year</b>
        </div>
        <span
          className="text-sm underline mt-1 cursor-pointer text-[#757575]"
          onClick={() => {
            setOpenBenefits(true);
          }}
        >
          What’s Included?
        </span>
      </section>

      <span className="text-sm text-[#616161] mt-5">Have a coupon code?</span>

      <section className="flex md:flex-row flex-col items-center md:gap-5 gap-3 w-fit">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="py-[10px] px-5 rounded-lg text-[16px] uppercase"
          style={{
            border: "1px solid #424242",
          }}
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setAppliedCoup(false);
            setAmountToPay(999);
          }}
        />
        <button
          disabled={appliedCoup}
          className="text-[16px] border border-[#FF5C5C] text-[#FF5C5C] py-[10px] px-5 rounded-lg"
          onClick={handleCouponCodeSubmit}
        >
          {appliedCoup ? "Applied" : "Apply Code"}
        </button>
      </section>
      <span
        className={`text-[#059669] text-[16px] -mt-4 ${
          appliedCoup ? "visible" : "hidden"
        }`}
      >
        Coupon applied successfully
      </span>

      <button
        className="text-[16px] bg-[#FF5C5C] text-white py-4 px-10 rounded-lg flex items-center gap-2 mt-5"
        onClick={handlePaymentClick}
      >
        Pay Rs.{amountToPay}/- <IoMdArrowForward />
      </button>
    </div>

    </>
  );
};

export default Payments;
