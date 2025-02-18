"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sportsData,type SportsType } from "@/data/AllEventData";
export default function EventsPage() {
  const [events, setEvents] = useState<SportsType[]>([]);
 
  useEffect(() => {
    setEvents(sportsData)
  }, []);

  return (
    <div className="p-6 bg-gray-100">
    <h1 className="text-2xl font-bold mb-6">Event Management</h1>

    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>ID</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Min Players</TableHead>
            
            <TableHead>Substitute</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>maxEntry</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event,index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{event.sport}</TableCell>
              <TableCell>{event.minPlayers}</TableCell>
              <TableCell>{event.substitute}</TableCell>
              <TableCell>{event.entryFee}</TableCell>
              <TableCell>{event.maxEntry}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

   
  </div>
  );
}
