import { propTypesInputProps } from "@material-tailwind/react/types/components/slider";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";

interface ButtonProps {
  text: string;
  onClick: () => void;
  icon;
  rightIcon;
}

// input field 1 ------
export const Button1: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  rightIcon,
}) => {
  return (
    <div>
      <button
        className="flex items-center gap-[8px] px-[40px] py-[12px] rounded bg-[#FF5C5C] font-inter text-xs text-[#FFFFFF]"
        onClick={onClick}
      >
        {icon} <div>{text}</div> {rightIcon}
      </button>
    </div>
  );
};

export const Button2: React.FC<ButtonProps> = ({
  text,
  onClick,
  textColor,
  borderColor,
  icon,
}) => {
  return (
    <div>
      <button
        className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded bg-[transparent] border-solid border-[1px] border-[${
          borderColor || "#FF5C5C"
        }] font-Public Sans text-xs text-[${textColor || "#FF5C5C"}]`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export const Button3: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  rightIcon,
}) => {
  return (
    <div>
      <button
        className="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[200px] bg-[#FF5C5C] font-inter text-xs text-[#FFFFFF]"
        onClick={onClick}
      >
        {icon} <div>{text}</div> {rightIcon}
      </button>
    </div>
  );
};

export const Button4: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  rightIcon,
}) => {
  return (
    <div>
      <button
        className="flex items-center gap-[8px] px-[20px] py-[12px] rounded-[200px] rounded bg-[transparent] border-solid border-[1px] border-[#BDBDBD] font-inter text-xs text-[#757575]"
        onClick={onClick}
      >
        {icon} <div>{text}</div> {rightIcon}
      </button>
    </div>
  );
};

export const Selectbutton = ({ item, value, text, OnClick }) => {
  return (
    <div className="BrandForm_CompanySize">
      <div>
        <button
          className={item === value ? "Selected" : ""}
          onClick={() => OnClick()}
        >
          {item === value ? <CiCircleCheck /> : ""}
          {text}
        </button>
      </div>
    </div>
  );
};
