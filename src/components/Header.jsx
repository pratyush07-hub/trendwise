"use client";

import {
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  NavbarLink,
  Button,
} from "flowbite-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiSearch } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";

const Header = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Navbar fluid className="border-b">
      <a
        href="/"
        className="text-2xl font-bold text-white whitespace-nowrap"
      >
        TrendWise
      </a>

      <div className="flex md:order-2 items-center gap-2">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HiSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-4 py-2 rounded-md border text-white border-gray-100 focus:outline-none "
          />
        </div>

        <AuthButton />

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink href="/" active={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={pathname === "/about"}>
          About
        </NavbarLink>
        <NavbarLink href="/blog" active={pathname === "/blog"}>
          All Blogs
        </NavbarLink>
        <NavbarLink href="/admin" active={pathname === "/admin"}>
          Admin
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
