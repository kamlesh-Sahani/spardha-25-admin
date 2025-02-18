"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Users, MapPin } from "lucide-react"

const EventDetails = () => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date("2025-03-01") - +new Date()
      let timeLeft = ""

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }

      return timeLeft
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="bg-[#003566] bg-opacity-10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center"
      >
        <Clock className="text-[#3D2F51] w-12 h-12 mb-4" />
        <h3 className="text-xl font-bold text-[#3D2F51]  mb-2">Event Starts In</h3>
        <div className="text-2xl font-bold text-black">{timeLeft}</div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-[#003566] bg-opacity-10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center"
      >
        <Users className="text-[#3D2F51] w-12 h-12 mb-4" />
        <h3 className="text-xl font-bold text-[#3D2F51] mb-2">Participants</h3>
        <div className="text-2xl font-bold text-black">500+</div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-[#003566] bg-opacity-10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center"
      >
        <MapPin className="text-[#3D2F51] w-12 h-12 mb-4" />
        <h3 className="text-xl font-bold text-[#3D2F51] mb-2">Location</h3>
        <div className="text-xl font-bold text-black text-center">DBIT (Adjacent to Sukhdev Vihar Metro Station)</div>
      </motion.div>
    </div>
  )
}

export default EventDetails
