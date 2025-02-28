// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { sportsData } from "@/data/AllEventData";
// import { allColleges } from "@/app/action/college.action";
// import { Sports } from "@/lib/type";
// import { default as ReactSelect } from "react-select";
// interface TeamDetails {
//   college: string;
//   team: string;
//   points: number;
// }

// interface FormData {
//   event: string;
//   winner: TeamDetails;
//   runnerUp: TeamDetails;
// }

// const initialFormData: FormData = {
//   event: "",
//   winner: { college: "", team: "", points: 0 },
//   runnerUp: { college: "", team: "", points: 0 },
// };
// const SportsPoints: React.FC = () => {
//   const [eventOptions, setEventOptions] = useState<any>();
//   const [collegeOptions, setCollegeOptions] = useState<any>();
//   const [event, setEvent] = useState("");
//   const [formData, setFormData] = useState<FormData>(initialFormData);
//   const [winner, setWinner] = useState({ college: "", team: "", points: "" });
//   const [runnerUp, setRunnerUp] = useState({
//     college: "",
//     team: "",
//     points: "",
//   });
//   useEffect(() => {
//     setEventOptions(() => {
//       const events =
//         sportsData?.map((event) => ({
//           value: event.sport,
//           label: event.sport,
//         })) || [];
//       return events;
//     });
//   }, [sportsData]);
//   const fetchCollegeAndEvent = async () => {
//     try {
//       const res = await allColleges();
//       const collegeRes = JSON.parse(res.colleges!);
//       setCollegeOptions(() => {
//         const collegeData =
//           collegeRes?.map((college: { name: string; _id: string }) => ({
//             value: college.name,
//             label: college.name,
//           })) || [];
//         return collegeData;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchCollegeAndEvent();
//   }, []);

//   const [selectedEvent, setSelectedEvent] = useState<Sports | undefined>(
//     undefined
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [eventData, setEventData] = useState<any>();
//   const inputRef = useRef(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | any
//   ) => {
//     const { name, value } = e.target || e;
//     if (name === "event") {
//       const selectedSport = value?.toLowerCase();
//       const filteredEvent = sportsData.find(
//         (data) => data.sport.toLowerCase() === selectedSport
//       );
//       setSelectedEvent(filteredEvent);
//     }

//     if (name == "captain") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   useEffect(() => {
//     setEventOptions(() => {
//       const events =
//         sportsData?.map((event) => ({
//           value: event.sport,
//           label: event.sport,
//         })) || [];
//       return events;
//     });
//   }, [sportsData]);

//   useEffect(() => {
//     fetchCollegeAndEvent();
//   }, []);
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
//         <h2 className="text-xl font-semibold text-center mb-4">
//           Add Sports Points
//         </h2>
//         <div className="flex flex-col">
//           <label className="text-gray-700 text-lg mb-2">Select Event</label>
//           {eventOptions ? (
//             <ReactSelect
//               name="event"
//               value={
//                 eventOptions.find(
//                   (option: any) => option.value === formData.event
//                 ) || null
//               }
//               onChange={(selectedOption) =>
//                 handleChange({
//                   name: "event",
//                   value: selectedOption?.value || "",
//                 })
//               }
//               options={eventOptions}
//               placeholder="Select Event"
//             />
//           ) : (
//             "Loading..."
//           )}
//         </div>
//         <div className="flex flex-col">
//           <label className="text-gray-700 text-lg mb-2">Select College</label>
//           {collegeOptions ? (
//             <ReactSelect
//               name="winnerCollege"
//               value={
//                 collegeOptions.find(
//                   (option: any) => option.value === formData.winner.college
//                 ) || null
//               }
//               onChange={(selectedOption) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   winner: {
//                     ...prevData.winner,
//                     college: selectedOption?.value || "",
//                   },
//                 }))
//               }
//               options={collegeOptions}
//               placeholder="Select College"
//             />
//           ) : (
//             "Loading..."
//           )}
//         </div>
//         <div className="flex flex-col">
//           <label className="text-gray-700 text-lg mb-2">Select College</label>
//           {collegeOptions ? (
//             <ReactSelect
//               name="runnerUpCollege"
//               value={
//                 collegeOptions.find(
//                   (option: any) => option.value === formData.runnerUp.college
//                 ) || null
//               }
//               onChange={(selectedOption) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   runnerUp: {
//                     ...prevData.runnerUp,
//                     college: selectedOption?.value || "",
//                   },
//                 }))
//               }
//               options={collegeOptions}
//               placeholder="Select College"
//             />
//           ) : (
//             "Loading..."
//           )}
//         </div>
//         {["Winner", "Runner-Up"].map((position, index) => (
//           <div key={index} className="border p-4 rounded-lg mb-4">
//             <h3 className="text-lg font-semibold mb-2">{position}</h3>
//             <label className="block mb-1">College Name:</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded mb-2"
//               onChange={(e) =>
//                 index === 0
//                   ? setWinner({ ...winner, college: e.target.value })
//                   : setRunnerUp({ ...runnerUp, college: e.target.value })
//               }
//             />
//             <label className="block mb-1">Team Name:</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded mb-2"
//               onChange={(e) =>
//                 index === 0
//                   ? setWinner({ ...winner, team: e.target.value })
//                   : setRunnerUp({ ...runnerUp, team: e.target.value })
//               }
//             />
//             <label className="block mb-1">Points:</label>
//             <input
//               type="number"
//               className="w-full border p-2 rounded"
//               onChange={(e) =>
//                 index === 0
//                   ? setWinner({ ...winner, points: e.target.value })
//                   : setRunnerUp({ ...runnerUp, points: e.target.value })
//               }
//             />
//           </div>
//         ))}
//         <button className="w-full bg-blue-500 text-white p-2 rounded mt-4">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SportsPoints;
"use client";
import React, { useEffect, useRef, useState } from "react";
import { sportsData } from "@/data/AllEventData";
import { allColleges } from "@/app/action/college.action";
import { addSportsPoints } from "@/app/action/result.actions";
import { default as ReactSelect } from "react-select";

interface TeamDetails {
  college: string;
  team: string;
  points: number;
}

interface FormData {
  event: string;
  winner: TeamDetails;
  runnerUp: TeamDetails;
}

const initialFormData: FormData = {
  event: "",
  winner: { college: "", team: "", points: 0 },
  runnerUp: { college: "", team: "", points: 0 },
};

const SportsPoints: React.FC = () => {
  const [eventOptions, setEventOptions] = useState<any[]>([]);
  const [collegeOptions, setCollegeOptions] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
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
          })) || []
        );
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWinnerChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      winner: {
        ...prevData.winner,
        [name]: value,
      },
    }));
  };

  const handleRunnerUpChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      runnerUp: {
        ...prevData.runnerUp,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await addSportsPoints(formData);
      setMessage(response.message || "Sports points updated successfully!");
      setFormData(initialFormData); // Reset form
    } catch (error: any) {
      setMessage(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Sports Points
        </h2>
        <div className="mb-4">
          <label className="text-gray-700 text-lg mb-2">Select Event</label>
          <ReactSelect
            name="event"
            value={eventOptions.find((opt) => opt.value === formData.event)}
            onChange={(selectedOption) =>
              handleChange("event", selectedOption?.value || "")
            }
            options={eventOptions}
            placeholder="Select Event"
          />
        </div>
        <div className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Winner</h3>
          <label className="block mb-1">College:</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.winner.college
            )}
            onChange={(selectedOption) =>
              handleWinnerChange("college", selectedOption?.value || "")
            }
            options={collegeOptions}
            placeholder="Select College"
          />
          <label className="block mt-2">Team Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-2"
            value={formData.winner.team}
            onChange={(e) => handleWinnerChange("team", e.target.value)}
          />
          <label className="block">Points:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={formData.winner.points}
            onChange={(e) =>
              handleWinnerChange("points", Number(e.target.value))
            }
          />
        </div>
        <div className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Runner-Up</h3>
          <label className="block mb-1">College:</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.runnerUp.college
            )}
            onChange={(selectedOption) =>
              handleRunnerUpChange("college", selectedOption?.value || "")
            }
            options={collegeOptions}
            placeholder="Select College"
          />
          <label className="block mt-2">Team Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-2"
            value={formData.runnerUp.team}
            onChange={(e) => handleRunnerUpChange("team", e.target.value)}
          />
          <label className="block">Points:</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={formData.runnerUp.points}
            onChange={(e) =>
              handleRunnerUpChange("points", Number(e.target.value))
            }
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
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
