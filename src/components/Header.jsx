"use client";

import {
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  NavbarLink,
  Button,
  TextInput,
} from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ Import usePathname

const Header = () => {
  const pathname = usePathname(); // ✅ Get the current route
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  };

  return (
    <Navbar fluid rounded className="border-b dark:border-gray-700">
      {/* Custom brand (without Navbar.Brand) */}
      <a
        href="/"
        className="text-2xl font-bold text-blue-600 dark:text-white whitespace-nowrap"
      >
        TrendWise
      </a>

      <div className="flex md:order-2 items-center gap-2">
        <TextInput
          type="text"
          placeholder="Search"
          icon={HiSearch}
          className="hidden md:block"
        />

        <Button gradientDuoTone="purpleToBlue">Sign In</Button>

        <Button pill size="sm" color="gray" onClick={toggleDarkMode}>
          {isDark ? "🌙" : "☀️"}
        </Button>

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        {/* Active link detection using pathname */}
        <NavbarLink href="/" active={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={pathname === "/about"}>
          About
        </NavbarLink>
        <NavbarLink href="/blog" active={pathname === "/blog"}>
          Blog
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;

