"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getEventDetail } from "@/app/action/team.action";
import Loader from "@/components/Loader";

const EventTable = () => {
  const [eventData, setEventData] = useState<
    { event: string; registration: number; totalCollege: number;btts:number;dbit:number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await getEventDetail();
        setEventData(JSON.parse(res.data!));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter events based on user input
  const filteredEvents = eventData.filter((event) =>
    event.event.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Event Details</h1>

          {/* Filter Input */}
          <div className="mb-4 flex justify-center">
            <Input
              type="text"
              placeholder="Search event..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full  border p-5 rounded-lg shadow-sm"
            />
          </div>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Event Name</TableHead>
                    <TableHead>Teams Registered</TableHead>
                    <TableHead>DBIT</TableHead>
                    <TableHead>Others</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {event.event}
                        </TableCell>
                        <TableCell>{event.registration}</TableCell>
                        <TableCell>{event.dbit}</TableCell>
                        <TableCell>{event.totalCollege - (event.dbit + event.btts)}</TableCell>
                
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        No events found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default EventTable;
