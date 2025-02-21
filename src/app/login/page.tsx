"use client";
import React, { useState,useEffect } from "react";
import { Lock, Mail } from "lucide-react";
import { adminLogin } from "../action/admin.action";
import {useRouter} from "next/navigation";
import { getCaptchaToken } from "@/utils/captcha.util";

const AdminLogin: React.FC = () => {
  const [passkey, setPasskey] = useState("");
  const [mail,setMail]=useState<string>("")
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token =  await getCaptchaToken()
      const res = await adminLogin(passkey,mail,token);
      if(!res.success){
        setError(res.message);
      }else{
        setIsLoggedIn(true)
      }
    } catch (err) {
      setError("An error occurred while verifying the passkey.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard"); // Redirect to dashboard
    }
  }, [isLoggedIn, router]);
  return (
    <div className="flex items-center justify-center mt-10 mb-3 h-[80vh] ">
    <div className="bg-[#fff] p-8 w-96 rounded-xl shadow-2xl ">
      <div className="flex justify-center mb-6">
        <Lock className="text-blue-600" size={48} />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Secure Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="w-full p-3 pl-10 text-left border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label
            htmlFor="passkey"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Passkey
          </label>
          <div className="relative">
            <input
              id="passkey"
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full p-3 pl-10  border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your passkey"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r w-full from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:scale-95"
        >
          {isLoading ? "Verifying..." : "Submit"}
        </button>
      </form>
    
    </div>
  </div>
  );
};

export default AdminLogin;
