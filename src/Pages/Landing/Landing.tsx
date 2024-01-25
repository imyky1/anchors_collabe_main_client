import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { IoMdArrowForward } from "react-icons/io";
import { useCoupon } from "../../Providers/Coupon";
import { usePayment } from "../../Providers/Payment";

type benefitProp = {
  onClose: () => void;
};

const BenefitsPopup: React.FC<benefitProp> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#12121280] flex items-center justify-center">
      <div
        className="flex flex-col items-center gap-3 bg-white w-[400px] p-5 box-border font-public rounded-xl"
        onClick={onClose}
      >
        <h2 className="text-lg font-bold leading-7">
          anchors | Collab Membership Highlights
        </h2>

        <ul className="flex flex-col gap-3 list-disc w-10/12 text-[16px]">
          <li>
            <b>Public Profile</b>: Showcase your creativity for brands to
            discover.
          </li>
          <li>
            <b>1-Year Validity</b>: Enjoy exclusive benefits for an entire year.
          </li>
          <li>
            <b>LinkedIn Creators Community</b>: Connect with a vibrant community
            of fellow LinkedIn creators.
          </li>
          <li>
            <b>Zero Commission</b>: Keep 100% of your earnings from brand
            collaborations.
          </li>
          <li>
            <b>Tailored Opportunities</b>: Access collaborations personalized
            for your unique skills.
          </li>
        </ul>

        <button className="text-[16px] bg-[#121212] text-[#BDBDBD] py-[10px] px-10 rounded-lg mt-10 mb-6">
          Got it
        </button>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const [openBenefits, setOpenBenefits] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCoup, setAppliedCoup] = useState(false);
  const [amountToPay, setAmountToPay] = useState(999);
  const couponState = useCoupon();
  const paymentState = usePayment();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCouponCodeSubmit = async () => {
    const result = await couponState?.checkAndVerifyCouponCode(
      coupon.toUpperCase()
    );
    if (result?.success) {
      setAppliedCoup(true);
      if (result.netToPay) {
        setAmountToPay(result.netToPay);
      }
    } else {
      alert(result?.error);
    }
  };

  // Handling the payment responses
  const handlePaymentResponse = async (response:{any}, orderId:string) => {
    setPaymentProcessing(true);
    setLoading(false);

    switch (response.status) {
      // 1. user cancelled the payment mode
      case "userCancelled":
        setPaymentProcessing(false);
        setLoading(false);
        alert(
          "It is a paid service, for using it you have to pay the one time payment"
        );
        break;

      //2. payment dropping by user --- dropped the payment by the user
      case "dropped":
        setPaymentProcessing(false);
        setLoading(false);
        alert(
          "It is a paid service, for using it you have to pay the one time payment"
        );
        break;

      //  2. payment failed due to any reasone
      case "failure":
        setPaymentProcessing(false);
        setLoading(false);

        alert(
          "Payment Failed, if amount got deducted inform us at info@anchors.in"
        );

        break;

      //  3. Payment pending due to any reason
      case "pending":
        // Inform lark bot about the failure
        setPaymentProcessing(false);
        setLoading(false);

        alert(
          "Payment is still pending, complete the payment to proceed,for issues inform us at info@anchors.in"
        );
        break;

      // 4. success payment
      case "success":
        setPaymentProcessing(false);
        setLoading(false);

        await paymentState?.updateInfluencerOrder(orderId,response)

        break;

      // Else all cases  -----------------
      default:
        setPaymentProcessing(false);
        setLoading(false);

        alert(
          "The order is not placed. Try again!!! ,in case of issues inform us at info@anchors.in "
        );
        break;
    }
  };
  
  const handlePaymentClick = async () => {
    if(coupon !== "" && !appliedCoup){
      alert("Verify the coupon first")
      return;
    }

    setPaymentProcessing(true);
    setLoading(true);

    try {
      const order = await paymentState?.createInfluencerEasebuzzOrder(
        "InfluencerFirstPay",
        "999",
        "Yuvraj Singh",
        "singhyuvraj0506@gmail.com",
        "Joining Fees",
        Date.now() + 365*24*60*60*1000,
        "6267941318",
        appliedCoup ? coupon : undefined
      );

      const key = await paymentState?.getEaseBuzz();

      const easebuzzCheckout = new window.EasebuzzCheckout(key, "test");

      const options = {
        access_key: order?.paymentData.data,
        onResponse: (response) => {
          // handling the edge cases of the response
          handlePaymentResponse(response, order?.order ?? "");
        },
        theme: "#000000", // color hex
      };

      easebuzzCheckout.initiatePayment(options);
    } catch (error) {
      alert("Error in proccessing the payment");
      setPaymentProcessing(false)
      setLoading(false)
    }
  };

  return (
    <>
      {openBenefits && (
        <BenefitsPopup
          onClose={() => {
            setOpenBenefits(false);
          }}
        />
      )}

      <div className="flex items-center w-screen justify-center min-h-screen">
        <Navbar />

        <section className="flex flex-col gap-7 text-center w-[550px] font-public items-center">
          <h1 className="font-bold text-[50px] text-black leading-tight">
            Get Noticed!
            <br /> Let Brands Find YOU
          </h1>

          <p className="text-xl text-[#616161]">
            Join anchors | Collab & create your profile so that brands can reach
            out to you for collaboration and pay you for the work you love to
            do, which is content creation.
          </p>

          <section className="flex flex-col items-center">
            <div className="py-2 px-5 border border-[#292929] inline-block text-sm rounded-[1000px]">
              Membership Fee: <b>₹999/year</b>
            </div>
            <span
              className="text-sm underline mt-1 cursor-pointer"
              onClick={() => {
                setOpenBenefits(true);
              }}
            >
              What’s Included?
            </span>
          </section>

          <span className="text-sm text-[#616161] ">
            Have a coupon code? Enter it below
          </span>

          <section className="flex items-center gap-5 w-fit">
            <input
              type="text"
              placeholder="Apply Coupon Code"
              className="border-[#424242] border py-[10px] px-5 rounded-lg focus:outline-none text-[16px] uppercase"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setAppliedCoup(false);
                setAmountToPay(999);
              }}
            />
            <button
              disabled={appliedCoup}
              className="text-[16px] bg-[#121212] text-[#BDBDBD] py-[10px] px-5 rounded-lg"
              onClick={handleCouponCodeSubmit}
            >
              {appliedCoup ? "Applied" : "Apply Code"}
            </button>
          </section>
          <span
            className={`text-[#059669] text-[16px] -mt-5 ${
              appliedCoup ? "visible" : "hidden"
            }`}
          >
            Coupon Code applied Successfully
          </span>

          <button className="text-[16px] bg-[#121212] text-white py-4 px-12 rounded-lg flex items-center gap-5" onClick={handlePaymentClick}>
            Continue To Pay {amountToPay} <IoMdArrowForward />
          </button>
        </section>
      </div>
    </>
  );
};

export default Landing;
