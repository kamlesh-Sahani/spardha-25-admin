"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { FaUser, FaDownload, FaTachometerAlt, FaUserGraduate } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoMdMail, IoMdCall } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";


const navItems = [
  { icon: FaTachometerAlt, label: "Home", path: "/" },
  { icon: MdEventAvailable, label: "Register", path: "/register" },
  { icon: FaDownload, label: "Download", path: "/download" },
  { icon: FaUserGraduate, label: "Profile", path: "/profile" },
  { icon: FaUser, label: "Admin", path: "/admin/dashboard" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 
  return (
    <div>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-[#f0a940] text-black py-4 px-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 px-3">
            <span className="flex items-center">
              <IoMdMail size={20} className="mr-2" /> spardha.dbit@gmail.com
            </span>
            <span className="flex items-center">
              <IoMdCall size={20} className="mr-2" /> +91 98736 68165
            </span>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <Link href="https://www.facebook.com/bttsggsipu">
              <FaFacebookF size={20} />
            </Link>
            <Link href=" https://x.com/bttsggsipu">
              <FaTwitter size={20} />
            </Link>
            <Link href=" https://www.instagram.com/donbosco_ggsipu/">
              {" "}
              <FaInstagram size={20} />
            </Link>
            <Link href="https://www.youtube.com/channel/UCM4ZafIAJQ20jgpIMqcNshA">
              {" "}
              <FaYoutube size={20} />
            </Link>
            {/*  */}
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:block bg-[#065b83] text-white py-1 sticky top-0 z-50">
        <div className="container mx-auto flex justify-around py-2 items-center">
          <Link href="/">
            <div className="text-2xl font-bold w-24 h-24 bg-white rounded-full flex justify-center items-center">
              <Image
                src="/dbit.png"
                width={72}
                height={72}
                // className="w-28 h-28"
                alt="Logo"
              />
            </div>
          </Link>

          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.path}>
                <span
                  className={`flex text-xl items-center space-x-2 ${
                    pathname === item.path
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-950 text-white rounded-full"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-64 bg-[#065b83] text-gray-200 z-40 lg:hidden"
          >
            <nav className="flex flex-col p-8 space-y-4 mt-16">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className={`flex items-center space-x-2 ${
                        pathname === item.path
                          ? "text-blue-400"
                          : "hover:text-blue-400"
                      }`}
                    >
                      <item.icon size={24} />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
