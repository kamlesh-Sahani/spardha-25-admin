"use client";

import { useRef,useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import BentoGrid from "@/components/BentoGrid";
import Header from "@/components/Header";
import EventCards from "@/components/SportsEventCard";
import EventDetails from "@/components/EventDetail";
import Footer from "@/components/Footer";


const InstructionPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundColor = useTransform(
    scrollYProgress,  
    [0, 0, 1],
    ["#003566", "#fdfbf0", "#ffe568"]
  );

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen relative pb-10"
      style={{ backgroundColor }}
    >
      <div className="relative z-10">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mt-[70px] mb-8 text-center text-[#3D2F51]"
          >
            Featured Events
          </motion.h2>
          <EventCards />
          <EventDetails />
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default InstructionPage;
