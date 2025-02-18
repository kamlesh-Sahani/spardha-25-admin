"use client"; // Ensure this is a Client Component

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {CheckCircle,XCircle,Trash2} from "lucide-react"
import axios from "axios";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Loader from "@/components/Loader";
import { default as ReactSelect } from "react-select"; // ✅ Correct aliasing
import { deleteTeam } from "@/app/action/team.action";

// Define type
interface Player {
  name: string;
  gender: string;
  mobile: string;
  email: string;
  playerIdCard: string;
  isCaptain: boolean;
  enrollment:string;
}

interface Team {
  _id: string;
  teamID: number;
  event: string;
  college: string;
  status: "pending" | "approved" | "rejected";
  transactionId: string;
  transactionSs: string;
  amount: number;
  players: Player[];
  createdAt: Date;
}

interface Filters {
  event: string;
  college: string;
  status: string;
  collegeOrder:string;
}

export default function AdminReportPage() {
  const [teams, setTeams] = useState<Team[]>();
  const [filters, setFilters] = useState<Filters>({
    event: "",
    college: "",
    status: "",
    collegeOrder:""
  });
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uiUpdate, setUiUpdate] = useState<boolean>(false);
  const [collegeData, setCollegeData] = useState<string[]>();
  const [eventData, setEventData] = useState<string[]>();
  const [statusLoading,setStatusLoading]= useState<boolean>(false);
  const [deleteDialog,setDeleteDailog]=useState<boolean>(false);


  // New state for handling approval/rejection reason
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusReason, setStatusReason] = useState("");
  const [currentStatus, setCurrentStatus] = useState<"approved" | "rejected" | "delete">();
  const [currentTeamId, setCurrentTeamId] = useState<string>();

  // Add new state for large image view
const [isImageModalOpen, setIsImageModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

// Event handler to open the image modal
const openImageModal = (imageSrc: string) => {
  setSelectedImage(imageSrc);
  setIsImageModalOpen(true);
};

// Event handler to close the image modal
const closeImageModal = () => {
  setIsImageModalOpen(false);
  setSelectedImage(null);
};



  const filteredTeams = (teams || [])
  .filter((team) => {
    return (
      (filters.event && filters.event !== "all"
        ? team.event.toLowerCase().includes(filters.event.toLowerCase())
        : true) &&
      (filters.college && filters.college !== "all"
        ? team.college.toLowerCase().includes(filters.college.toLowerCase())
        : true) &&
      (filters.status && filters.status !== "all"
        ? team.status === filters.status
        : true)
    );
  })
  .sort((a, b) => {
    if (filters.collegeOrder === "asc") {
      return a.college.localeCompare(b.college);
    } else if (filters.collegeOrder === "desc") {
      return b.college.localeCompare(a.college);
    }
    return 0;
  });






  // Update team status
  const updateTeamStatus = async () => {
    try {
      setStatusLoading(true);
      let res;
      if(currentStatus==="delete"){
        res = await deleteTeam(currentTeamId!)
      }else{
        const { data } = await axios.post("/api/report/status", {
          _id: currentTeamId,
          status: currentStatus,
          reason: statusReason,
        });
        res=data;
      }
      if (res.success) {
        toast.success(res.message || "Successfully updated");
        setUiUpdate((prev) => !prev);
        setIsStatusDialogOpen(false); // Close the dialog after submission
      } else {
        toast.error(res.message);
      }
     
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }finally{
      setStatusLoading(false);
    }
  };

  // Open status dialog for approve/reject
  const openStatusDialog = (
    teamId: string,
    status: "approved" | "rejected" | "delete"
  ) => {
    setCurrentTeamId(teamId);
    setCurrentStatus(status);
    setIsStatusDialogOpen(true);
  };

  // Open player details modal
  const openPlayerModal = (team: Team) => {
    setSelectedTeam(team);
    setIsPlayerModalOpen(true);
  };

  // Open transaction screenshot modal
  const openTransactionModal = (team: Team) => {
    setSelectedTeam(team);
    setIsTransactionModalOpen(true);
  };


  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/report/all");
      
        setTeams(data.teams);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [uiUpdate]);
  
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/report/data");
        setCollegeData(data.data.colleges);
        setEventData(data.data.events);
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Team Registrations Report</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {collegeData && (
          <ReactSelect
            value={
              filters.college
                ? { value: filters.college, label: filters.college }
                : { value: "all", label: "All Colleges" }
            }
            onChange={(selectedOption: any) =>
              setFilters({
                ...filters,
                college:
                  selectedOption?.value === "all" ? "" : selectedOption?.value,
              })
            }
            options={[
              { value: "all", label: "All Colleges" },
              ...(collegeData?.map((college) => ({
                value: college,
                label: college,
              })) || []),
            ]}
            placeholder="Filter by College"
            className="w-[300px]"
          />
        )}

        {eventData && (
          <ReactSelect
            value={
              filters.event
                ? { value: filters.event, label: filters.event }
                : { value: "all", label: "All Events" }
            }
            onChange={(selectedOption: any) =>
              setFilters({
                ...filters,
                event:
                  selectedOption?.value === "all" ? "" : selectedOption?.value,
              })
            }
            options={[
              { value: "all", label: "All Events" },
              ...(eventData?.map((event) => ({ value: event, label: event })) ||
                []),
            ]}
            placeholder="Filter by Event"
            className="w-[300px]"
          />
        )}

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>


        <Select
          value={filters.collegeOrder}
          onValueChange={(value) => setFilters({ ...filters, collegeOrder: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by college" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="all">Default</SelectItem>
            <SelectItem value="asc">College (A → Z)</SelectItem>
            <SelectItem value="dec">College (Z → A)</SelectItem>
          </SelectContent>
        </Select>



      </div>

      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team ID</TableHead>
                  <TableHead>Date</TableHead>
                
                  <TableHead>Event</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams &&
                  filteredTeams.map((team) => (
                    <TableRow key={team.teamID}>
                      <TableCell>{team.teamID}</TableCell>
                      <TableCell>
                        {team?.createdAt
                          ?  String(new Date(team.createdAt).toLocaleDateString()) +"  (" + 
                          String(new Date(team.createdAt).toLocaleTimeString())+ ")"
                          : "N/A"}
                      </TableCell>
                   


                      <TableCell>{team.event}</TableCell>
                      <TableCell>{team.college}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            team.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : team.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {team.status==="approved"?"Approved":team.status==="pending"?"Pending":"Rejected"}
                        </span>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => openPlayerModal(team)}
                        >
                          View Team
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => openTransactionModal(team)}
                        >
                          View Payment
                        </Button>
                        <Button
                          onClick={() => openStatusDialog(team._id, "approved")}
                          className="bg-green-800"
                          
                        >
                          <CheckCircle />
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => openStatusDialog(team._id, "rejected")}
                        >
                          <XCircle />
                        </Button>


                        <Button
                          onClick={() => openStatusDialog(team._id, "delete")}
                        >
                         <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Status Dialog (Reason Submission) */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="max-w-[400px] max-sm:max-w-[90vw] rounded z-[110]">
          <DialogHeader>
            <DialogTitle>
              {
                currentStatus ==="delete" ? "Are you sure to want to delete ?":<>
                 Provide a Reason for{" "}
              <span
                className={`${
                  currentStatus == "rejected"
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {currentStatus}
              </span>
                 </>
              }
             
            </DialogTitle>
            {
              currentStatus !=="delete" && <DialogDescription>
              Please provide a reason for the {currentStatus} status.
            </DialogDescription>
            }
          
          </DialogHeader>
          {
            currentStatus!=="delete" && <Input
            value={statusReason}
            onChange={(e) => setStatusReason(e.target.value)}
            placeholder={`Reason for ${currentStatus} optional`}
            className="w-full mb-4"
          />
          }
         
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={updateTeamStatus}>{statusLoading ? "Updating...": "Submit"}</Button>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
  <DialogContent className="max-w-[80vw] max-sm:max-w-[90vw]  rounded z-[110]">
    <DialogHeader>
      <DialogTitle>Player ID Card</DialogTitle>
    </DialogHeader>
    <img
      src={selectedImage || ""}
      alt="Large View"
      className="w-full h-[70vh] object-contain rounded"
    />
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={closeImageModal}>Close</Button>
    </div>
  </DialogContent>
</Dialog>


      <Dialog open={isPlayerModalOpen} onOpenChange={setIsPlayerModalOpen}>
        <DialogContent className="max-w-[70vw] max-sm:max-w-[90vw] rounded z-[110]">
          <DialogHeader>
            <DialogTitle>Player Details ({selectedTeam?.teamID})</DialogTitle>
            <DialogDescription>
              Details of players in the team.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Enrollment No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Captain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTeam?.players.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.gender}</TableCell>
                  <TableCell>{player.mobile}</TableCell>
                  <TableCell>{player.enrollment ? player.enrollment : "-"}</TableCell>
                  <TableCell>{player.email}</TableCell>
                 
                  <TableCell>{player.isCaptain ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div  className="bg-[#a3a2a2] h-[2px] rounded w-full"> </div>
          <h1 className="font-semibold">Players Id Cards</h1>
          <div className="flex overflow-x-auto gap-5 ">
            {selectedTeam?.players.map((player, index) => (
              <div className="flex flex-col " key={index}>
                <h3>{player.name}</h3>
                <img
                  src={player.playerIdCard}
                  className="min-w-[400px] h-[300px] object-contain rounded "
                  onClick={() => openImageModal(player.playerIdCard)} // Click handler
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Screenshot Modal */}
      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
      >
        <DialogContent className="max-w-[50vw] max-sm:max-w-[90vw] rounded z-[110]">
          <DialogHeader>
            <DialogTitle>Transaction Screenshot ({selectedTeam?.teamID})</DialogTitle>
            <DialogDescription>
              Screenshot of the transaction for the team.
            </DialogDescription>
            <DialogTitle>
              Transaction ID : {selectedTeam?.transactionId}
            </DialogTitle>
          </DialogHeader>
          <img
            src={selectedTeam?.transactionSs || ""}
            alt="Transaction Screenshot"
            className="w-[400px] h-[400px]  object-contain rounded "
            onClick={() => openImageModal(selectedTeam?.transactionSs || "")} // Click handler
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
