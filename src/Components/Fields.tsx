import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  maxLength?: number;
  autoComplete?: string;
  error?:boolean
  icon: any
}

interface UploadButtonProps {
  text: string;
}

interface SocialFieldProps {
  placeholder1: string;
  placeholder2: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value2: number;
  onChange2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  icon;
}

interface TagsFieldProps {
  data: string[];
  values: string[];
  setValues: (value: string[]) => void;
}

interface DropdownProps {
  values: string[];
  selectedValue: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  name?: string;
  id?: string;
  error?:boolean
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
  error,
  label
  
}) => {
  return (
    <div className={`w-full ${error && "outline-red-500 outline" }  flex-col text-[14px] text-[#424242] gap-[8px]`}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        className="w-full mt-[12px] box-border px-4 py-3 rounded font-inter text-xs bg-[#EEEEEE]"
        type={type ?? "text"}
        value={value ?? ""}
        onChange={onChange}
        name={name}
        id={id}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
      {error && <span className="font-inter text-[10px] text-red-600">This is a required field</span>}
    </div>
  );
};
export const InputField2: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  value,
  onChange,
  name,
  id,
  maxLength,
  autoComplete,
  icon
}) => {
  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        className="w-full bg-[transparent]"
        type={type ?? "text"}
        value={value ?? ""}
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
      <button className="flex items-center py-[6px] px-3 gap-1 font-inter text-[10px] text-[#FF5C5C] border-[#FF5C5C] border rounded z-10">
        <GoPlus />
        {text ?? ""}
      </button>
    </div>
  );
};

export const SocialField1: React.FC<SocialFieldProps> = ({
  placeholder1,
  placeholder2,
  value,
  onChange,
  value2,
  onChange2,
  name,
  id,
  icon,
}) => {
  // const [openOptions, setOpenOptions] = useState(false);

  // const SocialSites = [
  //   {
  //     name: "Linkedin",
  //     icon: <FaLinkedinIn />,
  //   },
  //   {
  //     name: "Telegram",
  //     icon: <FaTelegram />,
  //   },
  //   {
  //     name: "Instagram",
  //     icon: <FaInstagram />,
  //   },
  //   {
  //     name: "Twiiter",
  //     icon: <FaXTwitter />,
  //   },
  //   {
  //     name: "Facebook",
  //     icon: <FaFacebook />,
  //   },
  // ];

  return (
    <div className="flex w-full gap-2 items-center font-inter">
      <div>
        <div className="flex justify-between py-3 px-6 text-[#757575] rounded bg-[#EEEEEE] cursor-pointer relative">
          {icon}
          {/* {!openOptions ? (
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
          )} */}
        </div>

        {/* <div className="rounded bg-[#EEEEEE] py-3 px-4 flex flex-col ">
          {SocialSites.map((e)=>{
            return <span className="flex items-center gap-2 text-xs">{e.icon}{e.name}</span>
          })}
        </div> */}
      </div>
      <input
        type="number"
        placeholder={placeholder2}
        className="w-full px-4 py-3 bg-[#EEEEEE] rounded font-inter text-xs"
        value={value2 ?? ""}
        onChange={onChange2}
        name={name}
        id={id}
      />
      <input
        type="text"
        placeholder={placeholder1}
        className="w-full px-4 py-3 bg-[#EEEEEE] rounded font-inter text-xs"
        value={value ?? ""}
        onChange={onChange}
        name={name}
        id={id}
      />
    </div>
  );
};

export const TagsField1: React.FC<TagsFieldProps> = ({
  data,
  values,
  setValues,
}) => {
  const handleAddTag = (tag: string) => {
    if(values?.length > 0){
      if (values?.includes(tag)) {
        const index = values?.indexOf(tag);
        values?.splice(index, 1);
        setValues(values);
      } else {
        setValues([...values, tag]);
      }
    }
    else{
      setValues([tag])
    }
  };

  return (
    <div className="flex w-full gap-3 items-center font-inter flex-wrap ">
      {data?.map((e, i) => {
        return (
          <div
            key={Math.random() * i}
            onClick={() => handleAddTag(e)}
            className={`text-sm cursor-pointer py-2 px-3 rounded-[270px] ${
              values?.includes(e)
                ? "bg-[#D1FAE5] text-[#065F46]"
                : "text-[#757575] bg-[#EEEEEE]"
            } hover:bg-[#D1FAE5] hover:text-[#065F46]`}
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export const DropDown01: React.FC<DropdownProps> = ({
  defaultValue,
  placeholder,
  name,
  id,
  values,
  selectedValue,
  error
}) => {
  const [OpenDropDown, setOpenDropDown] = useState(false);
  const [dropValue, setdropValue] = useState("");
  const [dropDownData, setDropDownData] = useState([])

  OpenDropDown &&
    document.addEventListener("click", () => {
      setOpenDropDown(false);
    });

  useEffect(() => {
    if (defaultValue) {
      setdropValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
      setDropDownData(values);
  }, [values]);

  const handleChangeInput = (e) =>{
    setdropValue(e.target.value)
    const newArr = values.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()));
    setDropDownData(newArr)
  }

  return (
    // Normal type -1 text field used in create
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={`w-full box-border px-4 py-3 rounded bg-[#EEEEEE] relative flex items-center ${error && "outline-red-500 outline" }`}
        onClick={() => {
          setOpenDropDown(!OpenDropDown);
        }}
      >
        <input
          type="text"
          className="w-full bg-transparent border-none font-inter text-xs focus:outline-none"
          placeholder={placeholder}
          // disabled={true}
          // readOnly={true}
          name={name}
          id={id}
          value={dropValue}
          onChange={handleChangeInput}
        />
        <MdOutlineKeyboardArrowDown className="absolute right-4" />
      </div>
      {OpenDropDown && dropDownData.length > 0 && (
        <div className="absolute top-12 left-0 bg-[#E0E0E0] rounded w-full px-4 py-3 box-border text-[#757575] text-xs  font-inter flex flex-col items-center gap-3 max-h-[400px] overflow-y-auto z-20">
          {dropDownData.map((e, i) => {
            return (
              <span
                className="cursor-pointer hover:text-[#FF5C5C] w-full"
                key={i}
                onClick={() => {
                  setdropValue(e);
                  setOpenDropDown(false);
                  selectedValue(e);
                  // props?.onClick();
                }}
              >
                {e}
              </span>
            );
          })}
        </div>
      )}
       {error && <span className="font-inter text-[10px] text-red-600 -mt-3">This is a required field</span>}
    </div>
  );
};
