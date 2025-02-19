"use client";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Home,
  Linkedin,
  Github,
  Info,
  FileText,
  AlertCircle,
  Mail,
} from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-[#065b83]  text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-x-2">
              {/* <img
                src="https://www.donboscoitggsipu.org/images/logo.png"
                alt="DBIT Logo"
                className="w-15 h-15"
              /> */}
              <div className="flex flex-col justify-center text-center">
                <h3 className="text-lg font-bold">
                  Don Bosco Institute of Technology
                </h3>
                <p className="text-sm ">
                  Affiliated to GGSIPU, Delhi & Approved by AICTE
                </p>
                <p className="text-sm ">
                  (Adjacent to Sukhdev Vihar Metro Station)
                </p>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link href="https://www.facebook.com/bttsggsipu">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="https://x.com/bttsggsipu">
                  <FaXTwitter size={20} />
                </Link>
                <Link href="https://www.youtube.com/channel/UCM4ZafIAJQ20jgpIMqcNshA">
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link href="https://www.instagram.com/donbosco_ggsipu/">
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 hover:text-[#cca000] transition-colors"
                >
                  <Home className="w-4 h-4 text-white" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 hover:text-[#cca000] transition-colors"
                >
                  <Info className="w-4 h-4 text-white" />
                  <span>About us</span>
                </a>
              </li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>Okhla Road, New Delhi-110025</p>
              <p>+91 98736 68165</p>
              <p>spardha.dbit@gmail.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Design & Developed by</h3>
            <div className="space-y-2">
              <div className="flex gap-4 justify-start items-center">
                <p className="text-md">Saad Mehmood</p>
                <Link href={"https://github.com/Saadmehmood1234"} target="_blank">
                  <Github size={16} />
                </Link>
                <Link
                  href={" https://www.linkedin.com/in/saad-mehmood-4a6036255/"} target="_blank"
                >
                  {""}
                  <Linkedin size={16} />
                </Link>
              </div>
              <div className="flex gap-4 justify-start items-center">
                <p className="text-md">Kamlesh Kumar</p>
                <Link href={"https://github.com/kamlesh-Sahani"} target="_blank">
                  <Github size={16} />
                </Link>
                <Link href={"https://www.linkedin.com/in/kamlesh-sahani/"} target="_blank">
                  {" "}
                  <Linkedin size={16} />
                </Link>
              </div>
              <div className="flex gap-4 justify-start items-center">
                <p className="text-md">Sovan Kandar</p>
                <Link href={"https://github.com/sovankandar"} target="_blank">
                  <Github size={16} />
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/sovan-kandar-084b76307/" } target="_blank"
                >
                  {" "}
                  <Linkedin size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-around items-center">
          <p>© Copyrights 2025 Don Bosco Institute of Technology.</p>
          {/* <p>Designed by DBIT</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
