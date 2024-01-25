import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface ButtonProps {
  text:string,
  onClick:()=>void
}

// input field 1 ------
export const Button1: React.FC<ButtonProps> = ({ text,onClick }) => {
  return (
    <div>
      <button className="px-4 py-3 rounded bg-[#FF5C5C] font-inter text-xs" onClick={onClick}>{text}</button>
    </div>
  );
};

