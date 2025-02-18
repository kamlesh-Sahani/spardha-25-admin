"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search, Edit } from "lucide-react";  // Include Edit icon
import { allColleges, newCollege, updateCollege } from "@/app/action/college.action";  // Add updateCollege
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function CollegeTable() {
  const [colleges, setColleges] = useState<{ name: string; _id: string }[]>();
  const [newCollegeData, setNewCollegeData] = useState({ name: "" });
  const [editCollegeData, setEditCollegeData] = useState<{ name: string; _id: string } >({
    name:"",
    _id:""
  }); // New state for editing
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);  // State for edit dialog
  const [search, setSearch] = useState("");
  const [loading,setLoading]=useState<boolean>(false);
  const [uiUpdate,setUiUpdate]=useState<boolean>(false);

  const addCollege = async () => {
    try {
      const res = await newCollege(newCollegeData);
      if (res.success) {
        toast.success(res.message || "College added");
      } else {
        toast.error(res.message || "Error, please try again");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error, please try again");
    } finally {
      setOpen(false);
      setUiUpdate((prev)=>!prev);
    }
  };

  const updateCollegeDetails = async () => {
    if (!editCollegeData) return;
    
    try {
      const res = await updateCollege(editCollegeData); // Assuming you have an update function
      if (res.success) {
        toast.success(res.message || "College updated");
      } else {
        toast.error(res.message || "Error, please try again");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error, please try again");
    } finally {
      setEditOpen(false);
      setEditCollegeData({
        name:"",
        _id:""
      });  // Reset after editing

      setUiUpdate((prev)=>!prev);
    }
  };

  const filteredColleges =
    colleges && colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await allColleges();
        setColleges(JSON.parse(res.colleges!));
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    })();
  }, [uiUpdate]);

  return (
   <>
   {
    loading ?<Loader />: <div className="p-6 w-full mx-auto mt-10">
    {/* Page Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Colleges List</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="z-[90]">
          <Button variant="default" className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Add College
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md  z-[110]">
          <DialogHeader>
            <DialogTitle>Add a New College</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter College Name with city"
            value={newCollegeData.name}
            onChange={(e) =>
              setNewCollegeData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-3"
          />
          <p>Eg. Don Bosco Institute of Technology, Delhi</p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCollege}>Add College</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    {/* Search Bar */}
    <div className="relative mb-4">
      <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search for a college..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10"
      />
    </div>

    {/* College Table */}
    <div className="border rounded-lg shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-16 text-center">ID</TableHead>
            <TableHead>College Name</TableHead>
            <TableHead className="w-24 text-center">Actions</TableHead> {/* Add column for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredColleges && filteredColleges.length > 0 ? (
            filteredColleges.map((college: any, index: number) => (
              <TableRow key={college._id} className="hover:bg-gray-50 transition">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{college.name}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditCollegeData(college); // Set the college to be edited
                      setEditOpen(true); // Open edit dialog
                    }}
                  ><Edit  />
</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-4 text-gray-500"
              >
                No colleges found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    {/* Edit College Dialog */}
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
        </DialogHeader>
        {editCollegeData && (
          <>
            <Input
              placeholder="Enter College Name with city"
              value={editCollegeData.name}
              onChange={(e) =>
                setEditCollegeData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="mt-3"
            />
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={updateCollegeDetails}>Update College</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  </div>
   }
   </>
  );
}
