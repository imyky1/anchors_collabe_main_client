import React, { SetStateAction, useEffect, useRef, useState } from "react";
import {
  DropDown01,
  InputField1,
  SocialField1,
  TagsField1,
} from "../../../Components/Fields";
import { Button1 } from "../../../Components/Buttons";
import { Slider } from "@material-tailwind/react";
import ProfileDemo from "../../../Components/Preview/ProfileDemo";
import { useStaticData } from "../../../Providers/Data";
import { useInfluencer } from "../../../Providers/Influencer";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import "cropperjs/dist/cropper.css";
import { Cropper, ReactCropperElement } from "react-cropper";
import { TbEdit } from "react-icons/tb";
import { useGeneralSettings } from "../../../Providers/General";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function countNonEmptyFields(obj: {} | []) {
  let count = 0;
  let totalField = 0;

  function isArrayOrObject(input) {
    if (Array.isArray(input)) {
      return "Array";
    } else if (typeof input === "object" && input !== null) {
      return "Object";
    }
  }

  function countFieldsRecursiveObj(obj: {}) {
    for (const key in obj) {
      totalField++;

      if (isArrayOrObject(obj[key]) === "Object" && obj[key] !== null) {
        totalField--;
        countFieldsRecursiveObj(obj[key]);
      }

      else if (isArrayOrObject(obj[key]) === "Array" && obj[key] !== null && isArrayOrObject(obj[key][0]) === "Object") {
        totalField--;
        countFieldsRecursiveArr(obj[key]);
      }

      else if (obj[key] !== null && obj[key] !== "") {
        count++;
      }
    }
  }

  function countFieldsRecursiveArr(arr: []) {
    for (let index = 0; index < arr.length; index++) {
      const elem = arr[index];
      totalField++;
      if (isArrayOrObject(obj) === "Object" && elem !== null) {
        totalField--;
        countFieldsRecursiveObj(elem);
      } 

      else if (elem !== null && elem !== "") {
        count++;
      }

    }
  }

  if (isArrayOrObject(obj) === "Object") {
    countFieldsRecursiveObj(obj);
  } else if (isArrayOrObject(obj) === "Array") {
    countFieldsRecursiveArr(obj);
  }

  return count / totalField;
}

function sumAllValues(obj) {
  let sum = 0;

  function sumValuesRecursive(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "number") {
        sum += obj[key];
      }

      if (typeof obj[key] === "object" && obj[key] !== null) {
        sumValuesRecursive(obj[key]);
      }
    }
  }

  sumValuesRecursive(obj);

  return sum;
}

interface dataOneProps {
  name: string;
  tagline: string;
  linkedinLink: string;
  twitterLink: string;
  instaLink: string;
  fbLink: string;
  telegramLink: string;
  coverPhoto: string;
  profile: string;
  websiteLink: string;
  followers: {
    linkedin: number | null;
    twitter: number | null;
    fb: number | null;
    telegram: number | null;
    insta: number | null;
    website: number | null;
  };
}

interface dataTwoProps {
  companyName: string;
  companyUrl: string;
  companyProfile: string;
  goals: [];
  postLink: string;
}

interface dataThreeProps {
  platformName: string;
  profileLink: string;
  methods: [];
  paidAudience: number | null;
}

interface dataFourProps {
  categories: [];
  formats: [];
}

interface dataFiveProps {
  types: [];
  platforms: [
    {
      platform: string;
      audience: number;
      link: string;
    }
  ];
}

interface FormOneProps {
  data: dataOneProps;
  setData: React.Dispatch<React.SetStateAction<dataOneProps>>;
  formOneImages?: [];
  setFormOneImages?: React.Dispatch<React.SetStateAction<[]>>;
}

interface FormTwoProps {
  data: [dataTwoProps];
  setData: React.Dispatch<React.SetStateAction<[dataTwoProps]>>;
}

interface FormThreeProps {
  data: [dataThreeProps];
  setData: React.Dispatch<React.SetStateAction<[dataThreeProps]>>;
}

interface FormFourProps {
  data: dataFourProps;
  setData: React.Dispatch<React.SetStateAction<dataFourProps>>;
}

interface FormFiveProps {
  data: dataFiveProps;
  setData: React.Dispatch<React.SetStateAction<dataFiveProps>>;
}

const FormOne: React.FC<FormOneProps> = ({
  data,
  setData,
  formOneImages,
  setFormOneImages,
}) => {
  const [openCropModal, setOpenCropModal] = useState({
    value: false,
    index: null,
  });

  const [image, setImage] = useState(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const onSaveImage = () => {
    const cropper = cropperRef.current?.cropper;
    setFormOneImages((prev) => {
      let newArr = [...prev];
      newArr[openCropModal?.index] = cropper?.getCroppedCanvas()?.toDataURL();
      return newArr;
    });
    setImage(null);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
        setOpenCropModal({ value: true, index: index });
      };
      reader.readAsDataURL(files[0]);
    };

    // Move e.preventDefault() here to prevent the default file dialog from opening
    input.click();
  };

  return (
    <>
      <div className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5">
        <div className="w-full bg-[#212121] h-0 pb-[33%] relative rounded overflow-hidden">
          <img
            src={
              formOneImages[0] ??
              data?.coverPhoto ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jr51IO_5Aq3md1lzpvSr_UFrmrjeGhlTjQ&usqp=CAU"
            }
            alt=""
            className="absolute top-0 left-0 w-full h-full"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://cdn.pixabay.com/photo/2018/01/24/18/05/background-3104413_960_720.jpg";
            }}
          />
          <button
            className="absolute right-5 bottom-5 flex items-center py-[6px] px-3 gap-1 font-inter text-[10px] text-[#FF5C5C] border-[#FF5C5C] bg-white border rounded z-10"
            onClick={() => handleChangeImage(0)}
          >
            <GoPlus />
            Add Cover Photo
          </button>
        </div>

        <section className="mx-auto flex flex-col items-center gap-3 -mt-14 z-10 relative">
          <img
            src={
              formOneImages[1] ??
              data?.profile ??
              "https://t3.ftcdn.net/jpg/04/85/67/08/360_F_485670840_Ai4Rz09r0DmHlJycECZk23LVaocea4ZI.jpg"
            }
            alt=""
            className="w-20 h-20 rounded-full"
          />
          <button
            onClick={() => handleChangeImage(1)}
            className="absolute right-0 bottom-0 border bg-white text-[#FF5C5C] border-[#FF5C5C] rounded-full w-6 h-6 flex items-center justify-center"
          >
            <GoPlus />
          </button>
        </section>

        <InputField1
          placeholder="Your Full Name"
          value={data?.name}
          onChange={handleChange}
          name="name"
          id="name"
        />
        <InputField1
          placeholder="Your Tagline"
          value={data?.tagline}
          onChange={handleChange}
          name="tagline"
          id="tagline"
        />
      </div>

      {openCropModal?.value && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20 bg-[#eeeeee7b]">
          <div className="flex flex-col items-center gap-3">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={openCropModal?.index === 0 ? 3 / 1 : 1}
              src={image}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
              movable={false}
              cropBoxResizable={false}
              toggleDragModeOnDblclick={false}
            />

            <button
              className="px-5 py-3 bg-red-600 text-white rounded"
              onClick={() => {
                setOpenCropModal({ value: false, index: null });
                onSaveImage();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const FormTwo: React.FC<FormOneProps> = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e, field) => {
    const newObj = data?.followers;
    newObj[field] = e.target.value;
    setData({ ...data, followers: newObj });
  };

  return (
    <div className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5">
      <h1>Social Media Presence </h1>

      <SocialField1
        placeholder1="Paste your LinkedIn Profile’s link"
        placeholder2="No of followers"
        icon={<FaLinkedinIn />}
        name="linkedinLink"
        id="linkedinLink"
        value={data?.linkedinLink}
        onChange={handleChange}
        value2={data.followers?.linkedin}
        onChange2={(e) => handleChange2(e, "linkedin")}
      />
      <SocialField1
        placeholder1="Paste your Instagram Profile’s link"
        placeholder2="No of followers"
        icon={<FaInstagram />}
        name="instaLink"
        id="instaLink"
        value={data?.instaLink}
        onChange={handleChange}
        value2={data?.followers?.insta}
        onChange2={(e) => handleChange2(e, "insta")}
      />
      <SocialField1
        placeholder1="Paste Your Telegram Profile’s Link"
        placeholder2="No of followers"
        icon={<FaTelegram />}
        name="telegramLink"
        id="telegramLink"
        value={data?.telegramLink}
        onChange={handleChange}
        value2={data?.followers?.telegram}
        onChange2={(e) => handleChange2(e, "telegram")}
      />
      <SocialField1
        placeholder1="Paste Your Facebook Profile’s Link"
        placeholder2="No of followers"
        icon={<FaFacebook />}
        name="fbLink"
        id="fbLink"
        value={data?.fbLink}
        onChange={handleChange}
        value2={data?.followers.fb}
        onChange2={(e) => handleChange2(e, "fb")}
      />
      <SocialField1
        placeholder1="Paste Your Twitter Profile’s Link"
        placeholder2="No of followers"
        icon={<FaXTwitter />}
        name="twitterLink"
        id="twitterLink"
        value={data?.twitterLink}
        onChange={handleChange}
        value2={data?.followers?.twitter}
        onChange2={(e) => handleChange2(e, "twitter")}
      />
      <SocialField1
        placeholder1="Paste Your Website Link"
        placeholder2="No of Visitors"
        icon={<FaGlobe />}
        name="websiteLink"
        id="websiteLink"
        value={data?.websiteLink}
        onChange={handleChange}
        value2={data?.followers?.website}
        onChange2={(e) => handleChange2(e, "website")}
      />
    </div>
  );
};

const FormThree: React.FC<FormTwoProps> = ({
  data,
  setData,
  formTwoImages,
  setFormTwoImages,
}) => {
  const staticData = useStaticData();

  const [openCropModal, setOpenCropModal] = useState({
    value: false,
    index: null,
  });

  const [image, setImage] = useState(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const [tagsData, settagsData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Goal / KPI").then((e) => {
      settagsData(e);
    });
  }, []);

  const handleChangeData = (value: string, index: number, field: string) => {
    setData((prevData) => {
      const newArray = [...prevData];
      const updatedObj = newArray[index];
      updatedObj[field] = value;
      newArray[index] = updatedObj;
      return newArray;
    });
  };

  const handleAddCompany = () => {
    setData((prev) => [
      ...prev,
      {
        companyName: "",
        companyUrl: "",
        companyProfile: "",
        goals: [],
      },
    ]);
  };

  const onSaveImage = () => {
    const cropper = cropperRef.current?.cropper;
    setFormTwoImages((prev) => {
      let newArr = [...prev];
      newArr[openCropModal?.index] = cropper?.getCroppedCanvas()?.toDataURL();
      return newArr;
    });
    setImage(null);
  };

  const handleChangeImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
        setOpenCropModal({ value: true, index: index });
      };
      reader.readAsDataURL(files[0]);
    };

    // Move e.preventDefault() here to prevent the default file dialog from opening
    input.click();
  };

  return (
    <>
      <div
        className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5 items-start font-inter"
        style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
      >
        {data?.map((e, index) => {
          return (
            <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
              <section className="flex items-start gap-5">
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <img
                      src={
                        formTwoImages[index] ??
                        e.companyProfile ??
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                      }
                      alt=""
                      className="w-16 h-16 rounded-full"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
                      }}
                    />
                    <span
                      className="absolute right-0 bottom-0 bg-[#BDBDBD] border border-[#9e9e9e] text-[#757575] rounded-full p-1 cursor-pointer"
                      onClick={() => {
                        handleChangeImage(index);
                      }}
                    >
                      <TbEdit />
                    </span>
                  </div>
                  <span className="font-inter text-[#757575] font-medium">
                    Logo
                  </span>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <InputField1
                    placeholder="Company Name"
                    value={e.companyName}
                    onChange={(e) =>
                      handleChangeData(e.target.value, index, e.target.name)
                    }
                    name="companyName"
                    id="companyName"
                  />

                  <InputField1
                    placeholder="Company Website URL"
                    value={e.companyUrl}
                    onChange={(e) =>
                      handleChangeData(e.target.value, index, e.target.name)
                    }
                    name="companyUrl"
                    id="companyUrl"
                  />

                  <InputField1
                    placeholder="Collaboration Post link"
                    value={e.postLink}
                    onChange={(e) =>
                      handleChangeData(e.target.value, index, e.target.name)
                    }
                    name="postLink"
                    id="postLink"
                  />
                </div>
              </section>

              <h3 className="text-[#757575] font-inter text-xs font-bold">
                Select the goals that applied to this collaboration?{" "}
                <span className="font-normal">(Select all that apply)</span>
              </h3>
              <TagsField1
                data={tagsData ?? []}
                values={e.goals}
                setValues={(value: []) => {
                  setData((prevData) => {
                    const newArray = [...prevData];
                    const updatedObj = newArray[index];
                    updatedObj.goals = value;
                    newArray[index] = updatedObj;
                    return newArray;
                  });
                }}
              />
            </div>
          );
        })}

        <button
          className="text-[#757575] text-sm flex items-center gap-1"
          onClick={handleAddCompany}
        >
          <GoPlus /> Add more
        </button>
      </div>
      {openCropModal?.value && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20 bg-[#eeeeee7b]">
          <div className="flex flex-col items-center gap-3">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              src={image}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
              movable={false}
              cropBoxResizable={false}
            />

            <button
              className="px-5 py-3 bg-red-600 text-white rounded"
              onClick={() => {
                setOpenCropModal({ value: false, index: null });
                onSaveImage();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const FormFour: React.FC<FormThreeProps> = ({ data, setData }) => {
  const staticData = useStaticData();

  const [tagsData, setTagsData] = useState<[] | undefined>();
  const [platformData, setplatformData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Services list").then((e) => {
      setTagsData(e);
    });

    staticData?.getDataFromType("Platform Name").then((e) => {
      setplatformData(e);
    });
  }, []);

  const handleChangeData = (value: string, index: number, field: string) => {
    setData((prevData) => {
      const newArray = [...prevData];
      const updatedObj = newArray[index];
      updatedObj[field] = value;
      newArray[index] = updatedObj;
      return newArray;
    });
  };

  const handleAddCompany = () => {
    setData((prev) => [
      ...prev,
      {
        platformName: "",
        profileLink: "",
        methods: [],
      },
    ]);
  };

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      {data?.map((e, index) => {
        return (
          <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
            <div className="flex flex-col gap-3 w-full">
              <DropDown01
                placeholder="Select Platform"
                values={platformData ?? []}
                defaultValue={e.platformName}
                selectedValue={(value) => {
                  setData((prevData) => {
                    const newArray = [...prevData];
                    const updatedObj = newArray[index];
                    updatedObj.platformName = value;
                    newArray[index] = updatedObj;
                    return newArray;
                  });
                }}
                id={`dorpdownplatfrom${index}`}
              />
              <InputField1
                placeholder="Enter Your Profile Link"
                value={e.profileLink}
                onChange={(e) =>
                  handleChangeData(e.target.value, index, e.target.name)
                }
                name="profileLink"
                id="profileLink"
              />
              <InputField1
                placeholder="Total Paid Audience"
                type="number"
                value={e.paidAudience}
                onChange={(e) =>
                  handleChangeData(e.target.value, index, e.target.name)
                }
                name="paidAudience"
                id="paidAudience"
              />
            </div>

            <h3 className="text-[#757575] font-inter text-xs font-bold">
              Which Monetization Methods do you utilize?{" "}
              <span className="font-normal">(Select all that apply)</span>
            </h3>
            <TagsField1
              data={tagsData ?? []}
              values={e.methods}
              setValues={(value: []) => {
                setData((prevData) => {
                  const newArray = [...prevData];
                  const updatedObj = newArray[index];
                  updatedObj.methods = value;
                  newArray[index] = updatedObj;
                  return newArray;
                });
              }}
            />
          </div>
        );
      })}

      <button
        className="text-[#757575] text-sm flex items-center gap-1"
        onClick={handleAddCompany}
      >
        <GoPlus /> Add more
      </button>
    </div>
  );
};

const FormFive: React.FC<FormFourProps> = ({ data, setData }) => {
  const staticData = useStaticData();

  const [tagsData, setTagsData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Content Type").then((e) => {
      setTagsData(e);
    });
  }, []);

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Content Categories:{" "}
          <span className="font-light">(Select up to 6)</span>
        </h3>
        <p className="text-xs text-[#757575]">
          (Click "Other" if your category isn't listed)
        </p>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <TagsField1
          data={tagsData ?? []}
          values={data?.categories}
          setValues={(value: []) => {
            setData({ ...data, categories: value });
          }}
        />
      </div>
    </div>
  );
};

const FormSix: React.FC<FormFourProps> = ({ data, setData }) => {
  const staticData = useStaticData();

  const [tagsData, setTagsData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Content Format").then((e) => {
      setTagsData(e);
    });
  }, []);

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Content Formats:{" "}
          <span className="font-light">(Select all that apply)</span>
        </h3>
        <p className="text-xs text-[#757575]">
          Give brands a glimpse into your style
        </p>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <TagsField1
          data={tagsData ?? []}
          values={data?.formats}
          setValues={(value: []) => {
            setData({ ...data, formats: value });
          }}
        />
      </div>
    </div>
  );
};

const FormSeven: React.FC<FormFiveProps> = ({ data, setData }) => {
  const staticData = useStaticData();

  const [tagsData, setTagsData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Audience Category").then((e) => {
      setTagsData(e);
    });
  }, []);

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Your Audience Types:
        </h3>
        <p className="text-xs text-[#757575]">
          (Tell us what kind of people follow you, select up to 6)
        </p>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <TagsField1
          data={tagsData ?? []}
          values={data?.types}
          setValues={(value: []) => {
            setData({ ...data, types: value });
          }}
        />
      </div>
    </div>
  );
};

const FormEight: React.FC<FormFiveProps> = ({ data, setData }) => {
  const staticData = useStaticData();

  const [platformData, setplatformData] = useState<[] | undefined>();

  useEffect(() => {
    staticData?.getDataFromType("Audience Platform").then((e) => {
      setplatformData(e);
    });
  }, []);

  const handleChangeData = (value: string, index: number, field: string) => {
    setData((prevData) => {
      const newArray = [...prevData.platforms];
      const updatedObj = newArray[index];
      updatedObj[field] = value;
      newArray[index] = updatedObj;
      return { types: data?.types, platforms: newArray };
    });
  };

  const handleAddGroup = () => {
    let newArr;

    if (data?.platforms) {
      newArr = [
        ...data.platforms,
        {
          platform: "",
          audience: "",
          link: "",
        },
      ];
    } else {
      newArr = [
        {
          platform: "",
          audience: "",
          link: "",
        },
      ];
    }

    setData((prev) => ({
      ...prev,
      platforms: newArr,
    }));
  };

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <h3 className="text-[16px] text-[#424242] font-medium">
        Where can brands find your audience?
      </h3>
      <p className="text-xs text-[#757575] -mt-2">
        Add all the platforms you're on
      </p>

      <div className="bg-[#FEE2E2] rounded w-full p-5 flex flex-col gap-5 font-inter text-[#424242]">
        <h4 className="text-sm  font-medium">Sample Information</h4>
        <section className="flex flex-col gap-3 text-xs ">
          <p>
            Platform - <span className="text-[#757575]">WhatsApp</span>
          </p>
          <p>
            Audience Size - <span className="text-[#757575]">64547</span>
          </p>
          <p>
            Link -{" "}
            <span className="text-[#757575]">
              https://chat.whatsapp.com/FhXJTEeVti48y59eech6U8
            </span>
          </p>
        </section>
      </div>

      {data?.platforms?.map((e, index) => {
        return (
          <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
            <section className="w-full grid grid-cols-2 gap-5">
              <DropDown01
                placeholder="Select Platform"
                values={platformData ?? []}
                defaultValue={e?.platform}
                selectedValue={(value) => {
                  setData((prevData) => {
                    const newArray = [...prevData.platforms];
                    const updatedObj = newArray[index];
                    updatedObj.platform = value;
                    newArray[index] = updatedObj;
                    return { types: data?.types, platforms: newArray };
                  });
                }}
                id={`dorpdownplatfromaudience${index}`}
              />
              <InputField1
                placeholder="Audience Size"
                value={e.audience}
                type="number"
                onChange={(e) =>
                  handleChangeData(e.target.value, index, e.target.name)
                }
                name="audience"
                id="audience"
              />
            </section>
            <InputField1
              placeholder="Enter Link here"
              value={e.link}
              onChange={(e) =>
                handleChangeData(e.target.value, index, e.target.name)
              }
              name="link"
              id="link"
            />
          </div>
        );
      })}

      <button
        className="text-[#757575] text-sm flex items-center gap-1"
        onClick={handleAddGroup}
      >
        <GoPlus /> Add More Platform
      </button>
    </div>
  );
};

function dataUriToFile(dataUri, fileName) {
  // Extract the Base64 part
  let base64String = dataUri?.split(",")[1];

  // Add padding if needed
  while (base64String.length % 4) {
    base64String += "=";
  }

  // Decode the Base64 string
  const binaryString = atob(base64String);

  // Create a Uint8Array from the binary string
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create a File from the Uint8Array
  const file = new File([uint8Array], fileName || "image.png", {
    type: "image/png",
  });

  return file;
}

function generateRandomName() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let randomName = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomName += letters.charAt(randomIndex);
  }

  return randomName;
}

const Profile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const influencerState = useInfluencer();
  const generalState = useGeneralSettings();
  const [PercentageComplition, setPercentageComplition] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });
  const navigate = useNavigate();

  // for checking the type of service we need to create --------------------------------------
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  useEffect(() => {
    if (query.get("page")) {
      setCurrentPage(parseInt(query.get("page")));
    }
  }, [query]);

  // images states --------
  const [formOneImages, setFormOneImages] = useState<[]>([]);
  const [formTwoImages, setFormTwoImages] = useState([]);

  const [dataOne, setdataOne] = useState<dataOneProps>({
    name: "",
    tagline: "",
    linkedinLink: "",
    twitterLink: "",
    instaLink: "",
    fbLink: "",
    telegramLink: "",
    coverPhoto: "",
    profile: "",
    websiteLink: "",
    followers: {
      linkedin: null,
      twitter: null,
      fb: null,
      telegram: null,
      insta: null,
      website: null,
    },
  });

  const [dataTwo, setdataTwo] = useState<[dataTwoProps]>([
    {
      companyName: "",
      companyUrl: "",
      companyProfile: "",
      postLink: "",
      goals: [],
    },
  ]);

  const [dataThree, setdataThree] = useState<[dataThreeProps]>([
    {
      platformName: "",
      profileLink: "",
      methods: [],
      paidAudience: null,
    },
  ]);

  const [dataFour, setdataFour] = useState<dataFourProps>({
    categories: [],
    formats: [],
  });

  const [dataFive, setdataFive] = useState<dataFiveProps>({
    types: [],
    platforms: [
      {
        platform: "",
        audience: 0,
        link: "",
      },
    ],
  });

  const handleSubmit = async () => {
    generalState?.setLoading(true);
    if (currentPage === 1) {
      await handleSubmitFormOne();
      generalState?.setLoading(false);
    } else if (currentPage === 2) {
      await handleSubmitFormTwo();
      generalState?.setLoading(false);
    } else if (currentPage === 3) {
      await handleSubmitFormThree();
      generalState?.setLoading(false);
    } else if (currentPage === 4) {
      await handleSubmitFormFour();
      generalState?.setLoading(false);
    } else if (currentPage === 5) {
      await handleSubmitFormFive();
      generalState?.setLoading(false);
    }
  };

  // submit functions ------------------
  const handleSubmitFormOne = async () => {
    try {
      if (dataOne?.name?.length < 1 || dataOne?.tagline?.length < 1) {
        toast.error("Fill the form completely", {
          autoClose: 1500,
        });
        return;
      } else {
        let coverPhoto = dataOne.coverPhoto;
        let profile = dataOne.profile;
        if (formOneImages.length > 0) {
          for (let index = 0; index < formOneImages.length; index++) {
            const element = formOneImages[index];
            if (element) {
              const data1 = new FormData();
              const randomName = generateRandomName();
              const file = dataUriToFile(element, randomName + ".png");
              data1.append("file", file);
              const result = await influencerState?.uploadInfluencerImages(
                data1
              );
              if (result?.success) {
                if (index === 0) {
                  coverPhoto = result?.result?.Location;
                } else {
                  profile = result?.result?.Location;
                }
              }
            }
          }
        }
        const response = await influencerState?.updatePersonalInfo({
          ...dataOne,
          coverPhoto,
          profile,
        });
        if (response?.success) {
          // setCurrentPage(2);
          navigate("/influencer/build_profile?page=2");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured while saving the data", {
        autoClose: 2000,
      });
    }
  };

  const saveLogosCompany = async () => {
    let data = dataTwo;
    if (formTwoImages.length > 0) {
      for (let index = 0; index < formTwoImages.length; index++) {
        const element = formTwoImages[index];
        if (element) {
          const data1 = new FormData();
          const randomName = generateRandomName();
          const file = dataUriToFile(element, randomName + ".png");
          data1.append("file", file);
          const result = await influencerState?.uploadCompanyImages(data1);
          if (result?.success) {
            data[index].companyProfile = result?.result?.Location;
          }
        }
      }
    }
    return data;
  };

  const handleSubmitFormTwo = async () => {
    try {
      // if (dataOne?.name?.length < 1 || dataOne?.tagline?.length < 1) {
      //   alert("Fill the form completely");
      //   return;
      // } else {
      const data = await saveLogosCompany();
      const response = await influencerState?.updateCollabInfo(data);
      if (response?.success) {
        // setCurrentPage(3);
        navigate("/influencer/build_profile?page=3");
      }
      // }
    } catch (error) {
      toast.error("Some error occured while saving the data", {
        autoClose: 2000,
      });
    }
  };

  const handleSubmitFormThree = async () => {
    try {
      // if (dataOne?.name?.length < 1 || dataOne?.tagline?.length < 1) {
      //   alert("Fill the form completely");
      //   return;
      // } else {
      const response = await influencerState?.updateMonetizationInfo(dataThree);
      if (response?.success) {
        // setCurrentPage(4);
        navigate("/influencer/build_profile?page=4");
      }
      // }
    } catch (error) {
      toast.error("Some error occured while saving the data", {
        autoClose: 2000,
      });
    }
  };

  const handleSubmitFormFour = async () => {
    try {
      // if (dataOne?.name?.length < 1 || dataOne?.tagline?.length < 1) {
      //   alert("Fill the form completely");
      //   return;
      // } else {
      const response = await influencerState?.updateContentInfo(dataFour);
      if (response?.success) {
        // setCurrentPage(5);
        navigate("/influencer/build_profile?page=5");
      }
      // }
    } catch (error) {
      toast.error("Some error occured while saving the data", {
        autoClose: 2000,
      });
    }
  };

  const handleSubmitFormFive = async () => {
    try {
      // if (dataOne?.name?.length < 1 || dataOne?.tagline?.length < 1) {
      //   alert("Fill the form completely");
      //   return;
      // } else {
      const response = await influencerState?.updateAudienceInfo(dataFive);
      if (response?.success) {
        // setCurrentPage(5);
        // alert("form Saved");
        // toast.("Some error occured while saving the data",{
        //   autoClose:2000
        // });
        navigate("/influencer/share_profile");
      }
      // }
    } catch (error) {
      toast.error("Some error occured while saving the data", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    generalState.setLoading(true);
    influencerState?.getPersonalInfo().then((e) => {
      generalState.setLoading(false);
      if (e?.success) {
        setdataOne({ ...dataOne, ...e?.data });
        setdataTwo(
          e?.data2?.data ?? [
            {
              companyName: "",
              companyUrl: "",
              companyProfile: "",
              postLink: "",
              goals: [],
            },
          ]
        );
        setdataThree(
          e?.data3?.data ?? [
            {
              platformName: "",
              profileLink: "",
              methods: [],
              paidAudience: null,
            },
          ]
        );
        setdataFour(
          e.data4 ?? {
            categories: [],
            formats: [],
          }
        );
        setdataFive(
          e.data5 ?? {
            ...dataFive,
            platforms: [
              {
                platform: "",
                audience: 0,
                link: "",
              },
            ],
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    const cfd1 = countNonEmptyFields(dataOne)
    const cfd2 = countNonEmptyFields(dataTwo);
    const cfd3 = countNonEmptyFields(dataThree)
    const cfd4 = countNonEmptyFields(dataFour)
    const cfd5 = countNonEmptyFields(dataFive)

    setPercentageComplition({
      one: cfd1 * 20,
      two: cfd2 * 20,
      three: cfd3 * 20,
      four: cfd4 * 20,
      five: cfd5 * 20,
    });

    generalState.setBuildProfileCompletion({
      one: cfd1 * 20,
      two: cfd2 * 20,
      three: cfd3 * 20,
      four: cfd4 * 20,
      five: cfd5 * 20,
    })

  }, [dataOne, dataTwo, dataThree,dataFour,dataFive]);


  return (
    <>
      <div className="w-full px-10 py-5 box-border flex items-center justify-between  ">
        <section
          className="flex flex-col gap-5 w-[40vw] relative"
          id="profileData"
        >
          {currentPage === 1 && (
            <>
              <h1 className="text-[16px] font-inter font-medium">
                Build Your Profile
              </h1>
              <FormOne
                data={dataOne}
                setData={setdataOne}
                formOneImages={formOneImages}
                setFormOneImages={setFormOneImages}
              />
              <FormTwo data={dataOne} setData={setdataOne} />
            </>
          )}

          {currentPage === 2 && (
            <>
              <div>
                <h1 className="text-[16px] font-inter font-medium">
                  Collab Portfolio
                </h1>
                <span className="text-[#757575] font-inter text-xs -mt-1">
                  Showcase your past collaborations and impress brands with your
                  versatility and expertise
                </span>
              </div>
              <FormThree
                data={dataTwo}
                setData={setdataTwo}
                formTwoImages={formTwoImages}
                setFormTwoImages={setFormTwoImages}
              />
            </>
          )}

          {currentPage === 3 && (
            <>
              <div>
                <h1 className="text-[16px] font-inter font-medium">
                  Showcase your Monetization Expertise
                </h1>
                <span className="text-[#757575] font-inter text-xs -mt-1">
                  Demonstrate your ability to connect with and convert your
                  followers, making you a valuable brand partner
                </span>
              </div>
              <FormFour data={dataThree} setData={setdataThree} />
            </>
          )}

          {currentPage === 4 && (
            <>
              <div>
                <h1 className="text-[16px] font-inter font-medium">
                  Showcase Your Content Expertise & Style
                </h1>
                <span className="text-[#757575] font-inter text-xs -mt-1">
                  Help us understand your voice, format, and niche to match you
                  with ideal collaborations
                </span>
              </div>
              <FormFive data={dataFour} setData={setdataFour} />
              <FormSix data={dataFour} setData={setdataFour} />
            </>
          )}

          {currentPage === 5 && (
            <>
              <div>
                <h1 className="text-[16px] font-inter font-medium">
                  Your Audience & Community
                </h1>
                <span className="text-[#757575] font-inter text-xs -mt-1">
                  Brands are looking for creators who resonate with their target
                  audience. Share your community's demographics & platforms to
                  attract the perfect collab matches!
                </span>
              </div>
              <FormSeven data={dataFive} setData={setdataFive} />
              <FormEight data={dataFive} setData={setdataFive} />
            </>
          )}

          <div className="w-full flex flex-row-reverse">
            <Button1
              text="Continue"
              onClick={() => {
                handleSubmit();
              }}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3 h-screen items-start fixed top-[82px] right-20 w-[329px] h-full">
          <h1 className="text-[16px] font-inter font-medium">
            Profile Completion Status
          </h1>

          <Slider
            size="lg"
            color={sumAllValues(PercentageComplition) > 50 ? "green" : "deep-orange"}
            value={sumAllValues(PercentageComplition)}
            placeholder="as"
            min={0}
            max={100}
            className="h-5"
            thumbClassName="[&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:hidden"
          />

          <ProfileDemo
            data={{
              ...dataOne,
              collab: dataTwo,
              money: dataThree,
              ...dataFour,
              ...dataFive,
            }}
            uploadedImages={formOneImages ?? []}
            uploadedImages2={formTwoImages ?? []}
            gotToSection={currentPage === 2 ? "collabhistory" : currentPage === 3 ? "otherplatform" : currentPage === 4 ? "contentInfo" : currentPage === 5 ? "audience" : "topdetailsection"}
          />
        </section>
      </div>
    </>
  );
};

export default Profile;
