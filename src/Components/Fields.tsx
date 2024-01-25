import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  maxLength?: number;
  autoComplete?: string;
}

interface UploadButtonProps {
  text: string;
}

interface SocialFieldProps {
  placeholder: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
}

interface TagsFieldProps {
  data: string[];
}

// input field 1 ------
export const InputField1: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  value,
  onChange,
  name,
  id,
  maxLength,
  autoComplete,
}) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        className="w-full box-border px-4 py-3 rounded font-inter text-xs bg-[#EEEEEE]"
        type={type ?? "text"}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export const UploadButton1: React.FC<UploadButtonProps> = ({ text }) => {
  return (
    <div>
      <button className="flex items-center py-[6px] px-3 gap-1 font-inter text-[10px] text-[#FF5C5C] border-[#FF5C5C] border rounded">
        <GoPlus />
        {text}
      </button>
    </div>
  );
};

export const SocialField1: React.FC<SocialFieldProps> = ({
  placeholder,
  value,
  onChange,
  name,
  id,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const SocialSites = [
    {
      name: "Linkedin",
      icon: <FaLinkedinIn />,
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
    },
    {
      name: "Twiiter",
      icon: <FaXTwitter />,
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
    },
  ];

  return (
    <div className="flex w-full gap-2 items-center font-inter">
      <div>
        <div className="flex justify-between py-3 px-6 text-[#757575] rounded bg-[#EEEEEE] cursor-pointer relative">
          <FaLinkedinIn />
          {!openOptions ? (
            <MdOutlineKeyboardArrowDown
              className="absolute right-1"
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
            />
          ) : (
            <MdOutlineKeyboardArrowUp
              className="absolute right-1"
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
            />
          )}
        </div>
 
        <div className="rounded bg-[#EEEEEE] py-3 px-4 flex flex-col ">
          {SocialSites.map((e)=>{
            return <span className="flex items-center gap-2 text-xs">{e.icon}{e.name}</span>
          })}
        </div>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#EEEEEE] rounded font-inter text-xs"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
      />
    </div>
  );
};

export const TagsField1: React.FC<TagsFieldProps> = ({ data }) => {
  return (
    <div className="flex w-full gap-3 items-center font-inter flex-wrap ">
      {data?.map((e, i) => {
        return (
          <div
            key={Math.random() * i}
            className="text-sm text-[#757575] bg-[#EEEEEE] cursor-pointer py-2 px-3 rounded-[270px] hover:bg-[#D1FAE5] hover:text-[#065F46]"
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};
