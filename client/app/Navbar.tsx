import React from "react";
import Link from "next/link";
import { FaClinicMedical } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <FaClinicMedical />
      </Link>
      <ul>
        <Link href="/">Home</Link>
        <Link href="/contacts">Contacts</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
