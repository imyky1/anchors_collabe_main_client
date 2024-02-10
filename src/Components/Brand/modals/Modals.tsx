import React from "react";
import { IoIosClose } from "react-icons/io";
import { Button1, Button2, Selectbutton } from "../../Buttons";
import { GoUnlock } from "react-icons/go";
import { RxLightningBolt } from "react-icons/rx";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";

export const Modal1 = ({ onClose, credits, coins, onBuy }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#12121280] fixed top-0 left-0 z-50 font-inter">
      <div
        onClick={() => onClose()}
        className="w-[480px] flex justify-end cursor-pointer"
      >
        <IoIosClose color="black" size={24} />
      </div>
      <div className="bg-[#FAFAFA] p-6 flex flex-col items-center gap-4 rounded-lg w-[480px]">
        <div className="font-[inter] text-[20px] font-[700] text-[#424242]">
          Unlocking Influencer{" "}
        </div>
        <div className="font-[inter] text-[12px] font-[400] text-[#757575]">
          You are only one step away to unlock a influncer
        </div>
        <div className="font-[inter] text-[12px] font-[400] text-[#059669] mt-[20px]">
          Credits Available : <b>{credits}</b>
        </div>
        <div className="font-[inter] text-[12px] font-[400] text-[#757575]">
          Credits required for Unlock : <b>{coins}</b>
        </div>
        {parseInt(credits) >= parseInt(coins) ? (
          <div onClick={() => onBuy()} className="mt-[20px]">
            <Button1 icon={<GoUnlock size={16} />} text="Unlock Now" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-[8px] font-[inter] text-[12px] font-[400] text-[#AD0000] mt-[20px]">
              Insufficient Credits <IoMdInformationCircleOutline />
            </div>
            <Button2
              icon={<RxLightningBolt size={16} />}
              text="Recharge Credits"
            />
          </>
        )}
      </div>
    </div>
  );
};

export const Modal2 = ({ onClose, name, profile }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#12121280] fixed top-0 left-0 z-50 font-inter">
      <div
        onClick={() => onClose()}
        className="w-[480px] flex justify-end cursor-pointer"
      >
        <IoIosClose color="black" size={24} />
      </div>
      <div className="bg-[#FAFAFA] p-6 flex flex-col items-center gap-4 rounded-lg w-[480px]">
        <img src="/SuccessBuy.svg" alt="" />
        <div className="font-[inter] text-[20px] font-[700] text-[#10B981]">
          Congratulations!
        </div>
        <div className="font-[inter] text-[12px] font-[400] text-[#757575]">
          You have successfully Unlocked Influncer
        </div>
        <img
          className="size-[80px] border-[#FBBF24] border-[1px] rounded"
          src={profile}
          alt=""
        />
        <div className="font-[inter] text-[16px] font-[600] text-[#424242]">
          {name}
        </div>

        <div className="mt-[20px]">
          <Button1
            rightIcon={<IoMdArrowForward size={16} />}
            text="Check Profile"
          />
        </div>
      </div>
    </div>
  );
};

export const FilterOptionModal = ({ list, onClose, setfilters, filters }) => {
  const toggleFilter = (item) => {
    if (filters.includes(item)) {
      // If item is present, remove it
      setfilters((prev) => prev.filter((filter) => filter !== item));
    } else {
      // If item is not present, add it
      setfilters((prev) => [...prev, item]);
    }
  };
  return (
    <div className="w-[478px] px-[20px] py-[12px]  flex flex-col items-center justify-center bg-[#FAFAFA] absolute top-[65px] rounded  z-50 font-inter">
      <div
        style={{ display: "flex", width: "90%", flexWrap: "wrap", gap: "12px" }}
      >
        {list?.map((item) => (
          <Selectbutton
            OnClick={() => toggleFilter(item)}
            text={item}
            value={item}
            item={filters?.includes(item) ? item : ""}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button1 text="Done" onClick={() => onClose()} />
      </div>
    </div>
  );
};
