import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full border-8 border-t-8 border-[#3D2F51] w-20 h-20 mb-4"></div>
      <h2 className="text-xl text-gray-700 font-semibold animate-fadeIn opacity-90">
        Loading...
      </h2>
    </div>
  </div>
  )
}

export default Loader
