"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";

interface IPlayer {
  enrollment: string;
  email?: string;
  name: string;
  gender: string;
  mobile: string;
  playerIdCard: string;
  isCaptain?: boolean;
}

const dummyPlayers: IPlayer[] = [
  {
    enrollment: "123456",
    email: "player1@example.com",
    name: "John Doe",
    gender: "male",
    mobile: "9876543210",
    playerIdCard: "ID12345",
    isCaptain: true,
  },
  {
    enrollment: "654321",
    email: "player2@example.com",
    name: "Jane Smith",
    gender: "female",
    mobile: "9876543211",
    playerIdCard: "ID54321",
    isCaptain: false,
  },
];

const EditPlayers = () => {
  const [players, setPlayers] = useState<IPlayer[]>(dummyPlayers);

  const handleChange = (index: number, field: keyof IPlayer, value: string | boolean) => {
    const updatedPlayers = [...players];
    (updatedPlayers[index] as any)[field] = value;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = async () => {
    try {
      console.log("Updated Players:", players);
      alert("Player details updated successfully (dummy data)");
    } catch (error) {
      console.error("Error updating player details:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Players</h2>
      {players.map((player, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <h3 className="font-semibold">Player {index + 1}</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                value={player.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Name"
              />
              <Input
                type="text"
                value={player.enrollment}
                onChange={(e) => handleChange(index, "enrollment", e.target.value)}
                placeholder="Enrollment Number"
              />
              <Input
                type="email"
                value={player.email || ""}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                placeholder="Email"
              />
              <Input
                type="text"
                value={player.mobile}
                onChange={(e) => handleChange(index, "mobile", e.target.value)}
                placeholder="Mobile"
              />
              <Input
                type="text"
                value={player.playerIdCard}
                onChange={(e) => handleChange(index, "playerIdCard", e.target.value)}
                placeholder="Player ID Card"
              />
              <select
                value={player.gender}
                onChange={(e) => handleChange(index, "gender", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={player.isCaptain || false}
                  onChange={(e) => handleChange(index, "isCaptain", e.target.checked)}
                />
                <span className="ml-2">Captain</span>
              </label>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit} className="mt-4 w-full">Save Changes</Button>
    </div>
  );
};

export default EditPlayers;
