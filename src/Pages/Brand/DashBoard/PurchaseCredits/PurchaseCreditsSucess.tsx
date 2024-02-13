import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button1 } from "../../../../Components/Buttons";

export const PurchaseCreditsSucess = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search)
  const credits = query?.get("Credits")
  return (
    <>
      <div className=" text-[#424242] flex flex-col w-full h-full items-center justify-center ">
        <img className="mb-[30px]" src="/tick_circle.svg" alt="" />
        <p className="text-[40px] font-bold text-[#424242] ">
          {credits || 0} Credits Added!
        </p>
        <p className="text-center text-[14px] font-[400]">
          Access the best-suited influencers instantly & elevate your campaigns <br />
          Credits valid for current plan
        </p>
        <div className="flex flex-col px-[40px] py-[20px] mt-[20px] items-center gap-[20px] rounded-[8px] ">
          <Button1
            onClick={() => navigate("/Brand/DashBoard")}
            text={`Start Exploring`}
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
