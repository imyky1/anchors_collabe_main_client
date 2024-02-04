import { propTypesInputProps } from "@material-tailwind/react/types/components/slider";
import React from "react";

interface ButtonProps {
  text:string,
  onClick:()=>void
}

// input field 1 ------
export const Button1: React.FC<ButtonProps> = ({ text,onClick }) => {
  return (
    <div>
      <button className="px-[40px] py-[12px] rounded bg-[#FF5C5C] font-inter text-xs text-[#FFFFFF]" onClick={onClick}>{text}</button>
    </div>
  );
};

export const Button2 :  React.FC<ButtonProps> = ({text,onClick})=>{
  return (
    <div>
      <button className="px-[20px] py-[10px] rounded bg-[transparent] border-solid border-[1px] border-[#FF5C5C] font-Public Sans text-xs text-[#FF5C5C]" onClick={onClick}>{text}</button>
    </div>
  )
}

