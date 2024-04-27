import React from "react";
import isuLogo from "../images/cyclone_logo.png";
import { Link } from "@chakra-ui/react";

function Header() {
  return (
    <div className="sticky top-0 z-20 flex w-full bg-[#c81023] p-4 h-[80px] justify-center items-center">
      <Link href="/">
        <h1 className="text-xl text-white ">Allergy Prediciton AI</h1>
      </Link>
    </div>
  );
}

export default Header;
