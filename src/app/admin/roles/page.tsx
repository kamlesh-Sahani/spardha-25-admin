"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allAdmin, adminStatus, adminRole,adminRegister } from "@/app/action/admin.action";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RolesPage = () => {
  const [admins, setAdmins] = useState<
    {
      email: string;
      _id: string;
      role: string;
      active: boolean;
    }[]
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [uiUpdate, setUiUpdate] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleChange = async (adminId: string, role: "user" | "admin") => {
    try {
      setLoading(true);
      const res = await adminRole(adminId, role);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Internal error please try again"
      );
    } finally {
      setLoading(false);
      setUiUpdate((prev) => !prev);
    }
  };

  const toggleUserStatus = async (adminId: string, status: boolean) => {
    try {
      setLoading(true);
      const res = await adminStatus(adminId, status);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Internal error please try again"
      );
    } finally {
      setLoading(false);
      setUiUpdate((prev) => !prev);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (value: "user" | "admin") => {
    setNewUser((prev) => ({ ...prev, role: value }));
  };

  const addUser = async() => {
    if (!newUser.email || !newUser.password){
      toast.error("please fill the all fields");
      return;
    }
    const mail = newUser.email;
    const password = newUser.password;
    const role = newUser.role as "admin"|"user";
try{
  const res = await adminRegister(password,mail,role);
  if(res.success){
    toast.success(res.message);
  }else{
    toast.error(res.message);
  }
}catch(error:any){
  toast.error(error?.response?.data?.message || "internal error")
}finally{
  setIsDialogOpen(false);
  setNewUser({ email: "", password: "", role: "user" });
  setUiUpdate((prev)=>!prev);
}
    
   
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await allAdmin();

        setAdmins(JSON.parse(res.admins!));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [uiUpdate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">User Roles Management</h1>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <Button variant="default">Add User</Button>
          </DialogTrigger>
          <DialogContent className="z-[110]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className=""
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className=""
                />

                <Select value={newUser.role} onValueChange={handleRoleSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>

                <DialogFooter>
                  <Button onClick={addUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins &&
                admins.length > 0 &&
                admins.map((admin: any, index: number) => (
                  <TableRow key={admin._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      {admin.role == "admin"
                        ? "Admin"
                        : admin.role == "user"
                        ? "User"
                        : admin.role}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          admin.active
                            ? "bg-green-100 text-green-900"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin.active ? "Active" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-3 items-center ">
                      <Switch
                        checked={admin.active}
                        onCheckedChange={(status) =>
                          toggleUserStatus(admin._id, status)
                        }
                      />

                      <Select
                        value={admin.role}
                        onValueChange={(value: "user" | "admin") =>
                          handleRoleChange(admin._id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default RolesPage;
