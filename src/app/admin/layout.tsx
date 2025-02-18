import AdminSidebar from "@/components/admin/Sidebar";
import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="flex-1 h-[80vh] max-xl:h-[100vh]  overflow-y-auto bg-[#F3F4F6]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
