"use client";
import React, { useEffect, useState } from "react";
import { sportsData } from "@/data/AllEventData";
import { allColleges } from "@/app/action/college.action";
import ReactSelect from "react-select";

interface TeamDetails {
  college: string;
  points: number;
}

interface FormData {
  event: string;
  winner: TeamDetails;
  runnerUp: TeamDetails;
}

const initialFormData: FormData = {
  event: "",
  winner: { college: "", points: 0 },
  runnerUp: { college: "", points: 0 },
};

const SportsPoints: React.FC = () => {
  const [eventOptions, setEventOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [collegeOptions, setCollegeOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setEventOptions(
      sportsData?.map((event) => ({
        value: event.sport,
        label: event.sport,
      })) || []
    );
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await allColleges();
        const collegeRes = JSON.parse(res.colleges!);
        setCollegeOptions(
          collegeRes?.map((college: { name: string }) => ({
            value: college.name,
            label: college.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTeamChange = (
    team: "winner" | "runnerUp",
    field: keyof TeamDetails,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: field === "points" ? Number(value) : value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message || "Sports points updated successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🏆 Add Sports Points
        </h2>

        {/* Event Selection */}
        <div className="mb-5">
          <label className="text-gray-700 font-medium text-lg block mb-2">
            Select Event
          </label>
          <ReactSelect
            value={eventOptions.find((opt) => opt.value === formData.event)}
            onChange={(selected) =>
              handleChange("event", selected?.value || "")
            }
            options={eventOptions}
            placeholder="Choose an event..."
            className="text-lg"
          />
        </div>

        {/* Winner Section */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            🏅 Winner
          </h3>

          <label className="block text-gray-600 mb-1">College</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.winner.college
            )}
            onChange={(selected) =>
              handleTeamChange("winner", "college", selected?.value || "")
            }
            options={collegeOptions}
            placeholder="Select Winner College"
          />

          <label className="block text-gray-600 mt-3 mb-1">Points</label>
          <input
            type="number"
            className="w-full border rounded-md p-2 text-lg"
            value={formData.winner.points}
            onChange={(e) =>
              handleTeamChange("winner", "points", e.target.value)
            }
          />
        </div>

        {/* Runner-Up Section */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            🥈 Runner-Up
          </h3>

          <label className="block text-gray-600 mb-1">College</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.runnerUp.college
            )}
            onChange={(selected) =>
              handleTeamChange("runnerUp", "college", selected?.value || "")
            }
            options={collegeOptions}
            placeholder="Select Runner-Up College"
          />

          <label className="block text-gray-600 mt-3 mb-1">Points</label>
          <input
            type="number"
            className="w-full border rounded-md p-2 text-lg"
            value={formData.runnerUp.points}
            onChange={(e) =>
              handleTeamChange("runnerUp", "points", e.target.value)
            }
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full text-lg font-semibold p-3 rounded-md transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Success/Error Message */}
        {message && (
          <p
            className={`text-center mt-4 p-2 rounded-md ${
              message.includes("wrong")
                ? "bg-red-200 text-red-600"
                : "bg-green-200 text-green-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SportsPoints;
