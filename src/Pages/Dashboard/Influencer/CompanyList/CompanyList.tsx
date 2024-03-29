import React from "react";
import { useState } from "react";
import "./CompanyList.css";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { InputField1 } from "../../../../Components/Fields";
import { useInfluencer } from "../../../../Providers/Influencer";
import { toast } from "react-toastify";

export interface WishlistProps {
  companyName: string;
  companyUrl: string;
}

export const Company_list: React.FC = () => {
  const navigate = useNavigate();
  const influencerState = useInfluencer();

  const [data, setdata] = useState<[WishlistProps]>([
    {
      companyName: "",
      companyUrl: "",
    },
  ]);

  const addCompanylist = () => {
    setdata([
      ...data,
      {
        companyName: "",
        companyUrl: "",
      },
    ]);
  };

  const handleChangeData = (value: string, index: number, field: string) => {
    setdata((prevData) => {
      const newArray = [...prevData];
      const updatedObj = newArray[index];
      updatedObj[field] = value;
      newArray[index] = updatedObj;
      return newArray;
    });
  };

  const handleSubmit = async () => {
    let isError = false;
    try {
      data.map((item) => {
        if (!item.companyName) {
          isError = true
          return toast.error("Please fill Company Name", { autoClose: 1500 });
        }
        if (!item.companyUrl) {
          isError = true
          return toast.error("Please fill Company URL", { autoClose: 1500 });
        }
      });
      if (!isError) {
        let result = await influencerState?.updateWishlist(data);
        if (result?.success) {
          setdata([
            {
              companyName: "",
              companyUrl: "",
            },
          ]);
          toast.success("WishList saved", { autoClose: 1500 });
        } else {
          toast.error("Some Error Occurred, Please try again!", {
            autoClose: 1500,
          });
        }
      }
    } catch (error) {
      toast.error("Some Error Occurred, Please try again!", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="influencer_company_list_container">
      <div className="influence_copmany_list_wrapper">
        <div className="influence_copmany_list_header">
          <div className="influence_copmany_list_header_heading">
            <h1>Dream Brands? Craft Your Collab Wish List</h1>
            <h3>
              We can't guarantee every dream collab, but your wishlist fuels our
              search!
            </h3>
          </div>
          <button onClick={() => navigate("/influencer/view_brands_list")}>
            <CiViewList size={20} /> View Brand List
          </button>
        </div>
        <div className="influencer_company_selection_contaniner">
          {data?.map((item, index) => {
            return (
              <div key={index} className="influencer_company_selection_row">
                <InputField1
                  placeholder="Company Name"
                  value={item.companyName}
                  onChange={(e) =>
                    handleChangeData(e.target.value, index, e.target.name)
                  }
                  name="companyName"
                  id="companyName"
                />

                <InputField1
                  placeholder="Company Website URL"
                  value={item.companyUrl}
                  onChange={(e) =>
                    handleChangeData(e.target.value, index, e.target.name)
                  }
                  name="companyUrl"
                  id="companyUrl"
                />
              </div>
            );
          })}

          <button
            onClick={addCompanylist}
            className="influencer_company_selection_button"
          >
            + Add More Company
          </button>
        </div>
        <div className="influencer_company_submit_button">
          <button onClick={handleSubmit}>Submit →</button>
        </div>
      </div>
    </div>
  );
};
