
import { useState, useEffect } from "react";
import { PiWarningCircle } from "react-icons/pi";
import './SmallScreenAlert.css'
import Navbar from "../../Components/Navbar/Navbar";

export const ScreenAlert = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="success_container">
      <Navbar/>
      {isSmallScreen && (
        <div
          className="smallScreenAlert"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div>
            <PiWarningCircle size={24} />
          </div>
          <h2>
            Profile editing not supported on mobile yet. Please switch to
            desktop!
          </h2>
        </div>
      )}
    </div>
  );
};
