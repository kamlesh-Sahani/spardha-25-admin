"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import Spardha from "@/app/assets/logo.png";
import { Charm } from "next/font/google";

const charm = Charm({
  weight: ["400", "700"], // Available weights: 400 (Regular), 700 (Bold)
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {

  return (
    <header
      className="flex flex-col border-b-4  border-orange-700  lg:justify-center items-center text-center relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/back.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
        height: "80vh",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-dancing mt-12 text-4xl md:text-5xl font-bold lg:text-6xl mb-4 text-[#291d3a] relative z-10"
      >
        Don Bosco Institute of Technology
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl p-4 md:text-3xl lg:text-4xl relative z-10"
      >
        <Image
          src={Spardha}
          alt="Spardha Logo"
          width={700}
          height={300}
          priority
        />
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-mono text-2xl md:text-3xl font-bold lg:text-4xl mb-4 text-[#0c134f] relative z-10"
      >
        Annual Intercollege Sports Tournament
      </motion.h3>
      <motion.h4
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-mono text-xl md:text-2xl font-bold lg:text-3xl mb-4 text-[#291b0b] relative z-10"
      >
        28 February - 01 March, 2025
      </motion.h4>
      <span
        className={`${charm.className}  text-3xl md:text-4xl font-dancing font-extrabold text-[#91251d] mt-1 mb-2 relative z-10`}
      >
        <Typewriter
          words={[
            " Beyond Limits, Beyond Victory! 🚀🥇",
            "The Battle for Greatness Begins Here! ⚔🏆",
            "Fuel the Fire, Conquer the Arena! 🔥🏆",
          ]}
          loop={true}
          cursor={true}
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </span>
    </header>
  );
};

export default Header;
