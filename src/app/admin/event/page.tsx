"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { getTeamByEvent, getEvets } from "@/app/action/team.action";
import { ITeam } from "@/models/team.model";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa6";
import Loader from "@/components/Loader";

const RegistrationsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>(
    "Badminton Singles (Girl)"
  );
  const [data, setData] = useState<ITeam[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<string[]>();
  const [collegeChartData, setCollegeChartData] =
    useState<{ name: string; registrations: number }[]>();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const res = await getEvets();
      
        if (res.success) {
          const parsedEvents = JSON.parse(res.events!);
          setEvents(parsedEvents);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);
 
  const fetchEvent = async () => {
    try {
      if (!selectedEvent) {
        return;
      }
      setLoading(true);
      const res = await getTeamByEvent(selectedEvent);
      if (res.success) {
        setData(JSON.parse(res.teams!));
        setCollegeChartData(JSON.parse(res.collegeData!));
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [selectedEvent]);

  const teamDetail = (teamId: string) => {
    router.push(`/profile/id/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Event Data</h1>

      {/* Event Selection Dropdown */}

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-md mx-auto mb-8">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select an event" />
  </SelectTrigger>
  <SelectContent>
    {events && events.length > 0 ? (
      events.map((event, index) => (
        <SelectItem key={index} value={event}>
          {event}
        </SelectItem>
      ))
    ) : (
      <p>No events available</p>
    )}
  </SelectContent>
</Select>
          </div>
          {/* Metrics and Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{data && data.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>College Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={collegeChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registrations" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team ID</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>View Team Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.length > 0 ? (
                    data.map((t) => (
                      <TableRow key={t.teamID}>
                        <TableCell>{t.teamID}</TableCell>
                        <TableCell>{t.event}</TableCell>
                        <TableCell>{t.college}</TableCell>
                        <TableCell>{t.transactionId}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => teamDetail(t._id as any)}
                            variant={"outline"}
                          >
                            <FaRegEye />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No registrations found for this event.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RegistrationsPage;
