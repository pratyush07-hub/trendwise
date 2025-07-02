"use client";

import {
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  NavbarLink,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import { HiSearch } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Navbar fluid className="border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <a
        href="/"
        className="text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
      >
        TrendWise
      </a>

      <div className="flex md:order-2 items-center gap-2">
        {/* ✅ Search bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HiSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            className="block w-full pl-10 pr-4 py-2 rounded-md border text-white border-gray-300 focus:outline-none"
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
        <NavbarLink href="/create-post" active={pathname === "/create-post"}>
          CreatePost
        </NavbarLink>
        <NavbarLink href="/admin" active={pathname === "/admin"}>
          AdminDashboard
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
