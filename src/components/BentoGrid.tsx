"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"


const BentoGrid = ({ events }:{events:any}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10"
      >
        {events.map((event:any, index:number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-[#fff7d1] bg-opacity-10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
              event.size === "large-horizontal" ? "sm:col-span-2" : event.size === "large-vertical" ? "row-span-2" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${event.size === "large-vertical" ? "h-full" : "h-48 sm:h-64"}`}>
              <motion.img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003566] to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-[#cca000]">{event.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default BentoGrid
