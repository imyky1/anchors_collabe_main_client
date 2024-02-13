import React, { useEffect, useState } from 'react';
import { PiCoins } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  profile: string;
  credits: number;
}

export const Navbar3: React.FC<NavbarProps> = ({ credits }) => {
  const navigate = useNavigate()
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPopupOpen) {
        const popup = document.getElementById('popup');
        if (popup && !popup.contains(event.target as Node)) {
          setPopupOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    navigate('/logout')
  };

  return (
    <>
      <div className="w-full box-border px-5 py-3 flex items-center flex-row-reverse gap-8 bg-[#F5F5F5] relative">
        <img
          src={'/successTick.png'}
          alt=""
          className="rounded-full w-10 h-10 cursor-pointer relative"
          onClick={togglePopup}
        />
        {isPopupOpen && (
          <div id="popup" className="absolute p-[12px] w-[133px] z-[999]  top-[118%] flex flex-col items-end rounded-[4px] bg-[#E0E0E0] gap-2">
            <button
              className="text-[#424242] text-[16px] font-[400]  "
              // onClick={handleLogout}
            >
              Edit Profile
            </button>
            <button
              className="text-[#FF0000] text-[16px] font-[400]  "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <span className="bg-[#D1FAE5] py-2 px-3 border-none rounded-lg text-[16px] text-[#121212] font-[Inter] flex items-center gap-2 cursor-pointer">
          {'Credits Available -'} <PiCoins size={16} color="#FFD700" />
          <b>{credits}</b>
        </span>
      </div>
    </>
  );
};
