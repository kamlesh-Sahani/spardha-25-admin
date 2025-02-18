"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  PieChart,
  Users,
  School,
  Key,
  Gamepad,
} from "lucide-react";
import { adminLogout } from "@/app/action/admin.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { adminProfile } from "@/app/action/admin.action";
export default function AdminSidebar() {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [admin, setAdmin] = useState<{
    email: string;
    role: string;
    active: boolean;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await adminLogout();
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.reponse?.data?.message || "internal error");
    }
  };
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await adminProfile();
        if (res.success) {
          setAdmin(JSON.parse(res.admin!));
        } else {
          setAdmin(null);
         await adminLogout();
         router.push("/login");
        }
      } catch (error: any) {
        console.log(error);
        setAdmin(null);
        await adminLogout();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth < 1280) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
    if (!admin) return;  // Wait until admin is loaded

    if (!admin.active) {
      // If admin is inactive, log them out
      router.push("/login");
    } else {
      // If admin is active, check role-based redirection
      if (admin.role === "user") {
        if (pathname === "/admin/colleges" || pathname === "/admin/roles") {
          router.push("/admin/dashboard");
        }
      }
    }
  }, [pathname, admin]);
  return (
    <>
      {/* Sidebar Toggle Button */}
      <div onClick={() => setShowSidebar(!showSidebar)}>
        {!showSidebar && (
          <RiMenu4Fill className="text-3xl bg-black h-[40px] w-[40px] p-2 rounded-full dark:text-gray-100 text-white cursor-pointer xl:hidden absolute top-[10px] left-5 z-[100]" />
        )}
      </div>

      {/* Overlay when Sidebar is opened on small screens */}
      {showSidebar && (
        <div
          className="w-[50px] h-[50px] bg-black/30 fixed top-10 left-2 z-[99] xl:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Sidebar Content */}
      {showSidebar && (
        <div
          className={`bg-[#065B83] text-black xl:w-80 max-xl:w-[350px] fixed top-0 left-0 z-[100] flex flex-col xl:relative p-5 h-[80vh] max-xl:h-[100vh] `}
        >
          {/* Sidebar Header */}
          <div className="flex gap-5 items-center justify-between mb-7">
            <div className="flex gap-5 items-center">
              <img
                src={`https://avatar.iran.liara.run/public/boy?username=saad`}
                alt="Profile"
                className="h-[80px] w-[80px] border-white border-2 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h1 className="text-xl text-white font-semibold">
                  Admin panel
                </h1>
                <p className="text-white">Manage make easy</p>
              </div>
            </div>

            {/* Sidebar Close Button */}
            <button
              className="xl:hidden text-gray-300"
              onClick={() => setShowSidebar(false)}
            >
              X
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex flex-col gap-2 flex-[3]">
            <Link href="/admin/dashboard" >
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/dashboard" ? "bg-[#3B82F6]" : ""
                }`}
              >
                <PieChart />
                <p>Dashboard</p>
              </div>
            </Link>

            {admin && admin.active ? (
              <>
                <Link href="/admin/participants">
                  <div
                    className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                      pathname === "/admin/participants" ? "bg-[#3B82F6]" : ""
                    }`}
                  >
                    <Users />
                    <p>Participants</p>
                  </div>
                </Link>

                <Link href="/admin/attendance">
                  <div
                    className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                      pathname === "/admin/attendance" ? "bg-[#3B82F6]" : ""
                    }`}
                  >
                    <ShieldCheck />
                    <p>Attendance</p>
                  </div>
                </Link>
                <Link href="/admin/event">
                  <div
                    className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                      pathname === "/admin/event" ? "bg-[#3B82F6]" : ""
                    }`}
                  >
                    <Gamepad />
                    <p>visualize Events</p>
                  </div>
                </Link>
                <Link href="/admin/events">
                  <div
                    className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                      pathname === "/admin/events" ? "bg-[#3B82F6]" : ""
                    }`}
                  >
                    <Gamepad />
                    <p>Events</p>
                  </div>
                </Link>
              </>
            ) : (
              ""
            )}

            {loading ? (
              <h1>Loading...</h1>
            ) : (
              admin &&
              admin.active &&
              admin.role === "admin" && (
                <>
                  <Link href="/admin/colleges">
                    <div
                      className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                        pathname === "/admin/colleges" ? "bg-[#3B82F6]" : ""
                      }`}
                    >
                      <School />
                      <p>Manage Colleges</p>
                    </div>
                  </Link>

                  <Link href="/admin/roles">
                    <div
                      className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3B82F6] hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                        pathname === "/admin/roles" ? "bg-[#3B82F6]" : ""
                      }`}
                    >
                      <Key />
                      <p>Manage Roles</p>
                    </div>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Logout Button */}
          <div className="flex items-center justify-center flex-auto mt-5">
            <button
              onClick={() => setOpenModal(true)}
              className="w-[270px] bg-[#3B82F6] h-[40px] rounded-md text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {openModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="w-80 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
              Are you sure you want to Logout?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={logoutHandler}
              >
                Yes, I'm sure
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
