import React from "react";
import isuLogo from "../images/cyclone_logo.png";

function Header() {
  return (
    <div className="sticky top-0 z-20 flex w-full bg-[#c81023] p-4 h-[80px] justify-center items-center">
      <div className="relative h-[75px] w-24 cursor-pointer opacity-75 transition hover:opacity-100">
        <img src={isuLogo} alt="" />
      </div>
      <h1 className="text-xl text-white ">Allergy Prediciton AI</h1>
    </div>
  );
}

export default Header;
