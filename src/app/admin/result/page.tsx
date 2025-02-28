"use client";
import React, { useEffect, useRef, useState } from "react";
import { sportsData } from "@/data/AllEventData";
import { allColleges } from "@/app/action/college.action";
import { Sports } from "@/lib/type";
import { default as ReactSelect } from "react-select";
const SportsPoints: React.FC = () => {
  const [eventOptions, setEventOptions] = useState<any>();
  const [collegeOptions, setCollegeOptions] = useState<any>();
  const [event, setEvent] = useState("");
  const [winner, setWinner] = useState({ college: "", team: "", points: "" });
  const [runnerUp, setRunnerUp] = useState({
    college: "",
    team: "",
    points: "",
  });
  useEffect(() => {
    setEventOptions(() => {
      const events =
        sportsData?.map((event) => ({
          value: event.sport,
          label: event.sport,
        })) || [];
      return events;
    });
  }, [sportsData]);
  const fetchCollegeAndEvent = async () => {
    try {
      const res = await allColleges();
      const collegeRes = JSON.parse(res.colleges!);
      setCollegeOptions(() => {
        const collegeData =
          collegeRes?.map((college: { name: string; _id: string }) => ({
            value: college.name,
            label: college.name,
          })) || [];
        return collegeData;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCollegeAndEvent();
  }, []);
  const [formData, setFormData] = useState<{
    event: string;
    collegeName: string;
  }>({
    event: "",
    collegeName: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<Sports | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [eventData, setEventData] = useState<any>();
  const [apiResponseMessage, setApiResponseMessage] = useState<string | null>(
    null
  );
  const inputRef = useRef(null);

  const [currentPlayer, setCurrentPlayer] = useState<{
    name: string;
    enrollment: string;
    mobile: string;
    playerIdCard: File | null;
    gender: string;
    email: string;
    isCaptain: boolean;
  }>({
    name: "",
    enrollment: "",
    mobile: "",
    playerIdCard: null,
    gender: "",
    email: "",
    isCaptain: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | any
  ) => {
    const { name, value } = e.target || e;
    if (name === "event") {
      const selectedSport = value?.toLowerCase();
      const filteredEvent = sportsData.find(
        (data) => data.sport.toLowerCase() === selectedSport
      );
      setSelectedEvent(filteredEvent);
    }

    if (name == "captain") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePlayerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCurrentPlayer({ ...currentPlayer, [field]: e.target.value });
  };
  const handlePlayerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCurrentPlayer({
        ...currentPlayer,
        playerIdCard: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    setEventOptions(() => {
      const events =
        sportsData?.map((event) => ({
          value: event.sport,
          label: event.sport,
        })) || [];
      return events;
    });
  }, [sportsData]);

  useEffect(() => {
    fetchCollegeAndEvent();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Sports Points
        </h2>
        <div className="flex flex-col">
          <label className="text-gray-700 text-lg mb-2">Select Event</label>
          {eventOptions ? (
            <ReactSelect
              name="event"
              value={
                eventOptions.find(
                  (option: any) => option.value === formData.event
                ) || null
              }
              onChange={(selectedOption) =>
                handleChange({
                  name: "event",
                  value: selectedOption?.value || "",
                })
              }
              options={eventOptions}
              placeholder="Select Event"
            />
          ) : (
            "Loading..."
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-lg mb-2">Select College</label>
          {collegeOptions ? (
            <ReactSelect
              name="collegeName"
              value={
                collegeOptions.find(
                  (option: any) => option.value === formData.collegeName
                ) || null
              }
              onChange={(selectedOption) =>
                handleChange({
                  name: "collegeName",
                  value: selectedOption?.value || "",
                })
              }
              options={collegeOptions}
              placeholder="Select College"
              noOptionsMessage={() =>
                "If College not Listed Please Contact or WhatsApp @ +91 98970 53555"
              }
            />
          ) : (
            "Loading..."
          )}
          {errors.collegeName && (
            <p className="text-red-600 text-sm mt-1">{errors.collegeName}</p>
          )}
        </div>
        {/* <label className="block mb-2 font-medium">Select Event/Game:</label>
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select Event</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="cricket">Cricket</option>
        </select> */}
        {["Winner", "Runner-Up"].map((position, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">{position}</h3>
            <label className="block mb-1">College Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) =>
                index === 0
                  ? setWinner({ ...winner, college: e.target.value })
                  : setRunnerUp({ ...runnerUp, college: e.target.value })
              }
            />
            <label className="block mb-1">Team Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) =>
                index === 0
                  ? setWinner({ ...winner, team: e.target.value })
                  : setRunnerUp({ ...runnerUp, team: e.target.value })
              }
            />
            <label className="block mb-1">Points:</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                index === 0
                  ? setWinner({ ...winner, points: e.target.value })
                  : setRunnerUp({ ...runnerUp, points: e.target.value })
              }
            />
          </div>
        ))}
        <button className="w-full bg-blue-500 text-white p-2 rounded mt-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SportsPoints;
// "use client";
// import toast from "react-hot-toast";
// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import eventImage from "@/data/EventData";
// import { registerAction } from "../action/team.action";
// import { sportsData } from "@/data/AllEventData";
// import { z } from "zod";
// import { default as ReactSelect } from "react-select";
// import { playerSchema, registrationSchema } from "@/data/Zod";
// import { useRouter } from "next/navigation";
// import { Sports } from "@/lib/type";
// import { allColleges } from "../action/college.action";
// import { getCaptchaToken } from "@/utils/captcha.util";
// const Register = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<{
//     event: string;
//     collegeName: string;
//     players: {
//       name: string;
//       enrollment: string;
//       mobile: string;
//       playerIdCard: File | null;
//       gender: string;
//       isCaptain: boolean;
//       email: string;
//     }[];
//     captain: string;
//     transactionId: string;
//     amount: number;
//     // captainIdCard:File | null;
//     whatsapp: string;
//     transactionImage: File | null;
//     captchaToken: string;
//   }>({
//     event: "",
//     collegeName: "",
//     players: [],
//     captain: "",
//     transactionId: "",
//     amount: 0,
//     whatsapp: "",
//     transactionImage: null,
//     // captainIdCard: null,
//     captchaToken: "",
//   });
//   const [selectedEvent, setSelectedEvent] = useState<Sports | undefined>(
//     undefined
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [eventData, setEventData] = useState<any>();
//   const [apiResponseMessage, setApiResponseMessage] = useState<string | null>(
//     null
//   );
//   const [eventOptions, setEventOptions] = useState<any>();
//   const [collegeOptions, setCollegeOptions] = useState<any>();
//   const inputRef = useRef(null);

//   const [currentPlayer, setCurrentPlayer] = useState<{
//     name: string;
//     enrollment: string;
//     mobile: string;
//     playerIdCard: File | null;
//     gender: string;
//     email: string;
//     isCaptain: boolean;
//   }>({
//     name: "",
//     enrollment: "",
//     mobile: "",
//     playerIdCard: null,
//     gender: "",
//     email: "",
//     isCaptain: false,
//   });
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
//         players: prevData.players.map((player) => ({
//           ...player,
//           isCaptain: player.name == value,
//         })),
//         [name]: value,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handlePlayerChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setCurrentPlayer({ ...currentPlayer, [field]: e.target.value });
//   };
//   const handlePlayerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setCurrentPlayer({
//         ...currentPlayer,
//         playerIdCard: e.target.files[0],
//       });
//     }
//   };

//   const handleTransactionImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files) {
//       setFormData({
//         ...formData,
//         transactionImage: e.target.files[0],
//       });
//     }
//   };
//   // const handleCaptainImageChange = (
//   //   e: React.ChangeEvent<HTMLInputElement>
//   // ) => {
//   //   if (e.target.files) {
//   //     setFormData({
//   //       ...formData,
//   //       captainIdCard: e.target.files[0],
//   //     });
//   //   }
//   // };
//   const addPlayer = () => {
//     try {
//       const validationResult = playerSchema.safeParse(currentPlayer);
//       if (!validationResult.success) {
//         const newErrors: any = {};
//         validationResult.error.errors.forEach((err) => {
//           newErrors[err.path[0]] = err.message;
//         });
//         setErrors(newErrors);
//         setApiResponseMessage(
//           "Validation failed. Please check the form fields."
//         );
//         return;
//       }
//       setFormData((prev) => ({
//         ...prev,
//         players: [...prev.players, currentPlayer],
//       }));

//       setCurrentPlayer({
//         name: "",
//         enrollment: "",
//         mobile: "",
//         playerIdCard: null, // Reset image field
//         gender: "",
//         email: "",
//         isCaptain: false,
//       });

//       setErrors({
//         name: "",
//         enrollment: "",
//         email: "",
//         mobile: "",
//         playerIdCard: "",
//         gender: "",
//       });
//     } catch (err: any) {
//       if (err instanceof z.ZodError) {
//         console.error("Unexpected ZodError:", err);
//         setApiResponseMessage("Something went wrong.");
//       } else {
//         setApiResponseMessage("Something went wrong. Please try again.");
//       }
//     }

//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formData.players.length < (selectedEvent?.minPlayers ?? 0)) {
//       console.log(formData.players);
//       setErrors({ players: "Please add enough players to meet the minimum requirement" });
//       toast.error("You need to add the minimum number of players. Did you click the 'Add Player' button?");
//       return;
//     }
//     setLoading(true);
//     const token = await getCaptchaToken();
//     const newUser = {
//       ...formData,
//       whatsapp: selectedEvent!.watsapp,
//       captchaToken: token,
//     };
//     setApiResponseMessage("");
//     const validation = registrationSchema.safeParse(newUser);

//     if (!validation.success) {
//       const errors = validation.error.errors.reduce(
//         (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
//         {} as Record<string, string>
//       );
//       setErrors(errors);
//       setLoading(false);
//       console.log(errors)
//       Object.values(errors).forEach((errorMessage) => {
//         toast.error(errorMessage);
//       });
//       return;
//     }
//     try {
//       const res = await registerAction(newUser);
//       console.log(res,"res");
//       if (res.success) {
//         toast.success(
//           "Registration successful! 🎉 Check your email to track your application status.",
//           {
//             duration: 3000,
//           }
//         );

//         router.push(`/profile?pass=${JSON.parse(res.password!)}`);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err: any) {
//       console.log(err, "register error");
//       toast.error(
//         err?.response?.data?.message || "something went wrong try again "
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     setEventData(eventImage);
//   }, []);

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
//   const handleDeletePlayer = (indexToDelete: number) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       players: prevData.players.filter((_, index) => index !== indexToDelete),
//     }));
//   };
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

//   return (
//     <div className="flex max-md:flex-col justify-center gap-4 items-start min-h-screen bg-gradient-to-r from-[#b98867] to-[#f5a937] p-6">
//       <div className="flex relative top-[-12px] w-full max-w-3xl flex-col  bg-white rounded-3xl shadow-lg">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-3xl  bg-white rounded-2xl"
//         >
//           <div className="md:text-4xl p-4 text-3xl font-bold bg-[#f5a937] text-white text-center rounded-t-xl">
//             <h1>Event Registration</h1>
//             <p className="text-lg mt-2">In case you find difficulty in Registration, contact Dr. Vishal Raghav @9897053555</p>
//           </div>
//           <motion.div
//             // variants={itemVariants}
//             className="col-span-2 p-4  bg-yellow-200 border-l-4 border-red-500"
//             whileInView={{ scale: [0.98, 1.01, 1] }}
//             viewport={{ once: true }}
//           >
//             <p className="text-red-800 text-md font-semibold">
//               <strong>Note:</strong> Enter all the details very carefully
//               without any Spelling mistakes/Typographic errors. Same data will
//               be used to print the Certificates. Player's Name must be as per
//               college records.
//             </p>
//           </motion.div>
//           <hr className="border-t border-white/20 my-0" />
//           <form onSubmit={handleSubmit} className="px-6 py-0">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               className="grid grid-cols-1 gap-4"
//             >
//   <div className="flex flex-col">
//     <label className="text-gray-700 text-lg mb-2">
//       Select Event
//     </label>
//     {eventOptions ? (
//       <ReactSelect
//         name="event"
//         value={
//           eventOptions.find(
//             (option: any) => option.value === formData.event
//           ) || null
//         }
//         onChange={(selectedOption) =>
//           handleChange({
//             name: "event",
//             value: selectedOption?.value || "",
//           })
//         }
//         isDisabled={!!selectedEvent} // ✅ Convert to boolean
//         options={eventOptions}
//         placeholder="Select Event"
//       />
//     ):"Loading..."}
//     {errors.event && (
//       <p className="text-red-600 text-sm mt-1">{errors.event}</p>
//     )}
//   </div>

//   <div className="flex flex-col">
//     <label className="text-gray-700 text-lg mb-2">
//       Select College
//     </label>
//     {collegeOptions ? (
//       <ReactSelect
//         name="collegeName"
//         value={
//           collegeOptions.find(
//             (option: any) => option.value === formData.collegeName
//           ) || null
//         }
//         onChange={(selectedOption) =>
//           handleChange({
//             name: "collegeName",
//             value: selectedOption?.value || "",
//           })
//         }
//         options={collegeOptions}
//         placeholder="Select College"
//         noOptionsMessage={() =>
//           "If College not Listed Please Contact or WhatsApp @ +91 98970 53555"
//         }
//       />
//     ):"Loading..."}
//     {errors.collegeName && (
//       <p className="text-red-600 text-sm mt-1">
//         {errors.collegeName}
//       </p>
//     )}
//   </div>
//             </motion.div>
//             <hr className="border-t border-gray-600 my-8" />

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               className="mt-6"
//             >
//               <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                 Add Player to List
//               </h2>
//               {formData.players?.length <
//                 (selectedEvent?.substitute === "NA"
//                   ? selectedEvent.minPlayers
//                   : selectedEvent?.substitute ?? 0) && (
//                 <div className="flex flex-col gap-4 mb-4">
//                   <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       {/* <label>Player Name</label> */}
//                       <input
//                         type="text"
//                         name="name"
//                         value={currentPlayer.name}
//                         onChange={(e) => handlePlayerChange(e, "name")}
//                         placeholder="Enter Player Full Name"
//                         className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                       />
//                       {errors.name && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.name}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       {/* <label>Player Enrollment Number</label> */}
//                       <input
//                         type="text"
//                         name="enrollment"
//                         value={currentPlayer.enrollment}
//                         onChange={(e) => handlePlayerChange(e, "enrollment")}
//                         placeholder="Enter Player Enrollment"
//                         className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                       />
//                       {errors.enrollment && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.enrollment}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       {/* <label>Player Email</label> */}
//                       <input
//                         type="email"
//                         value={currentPlayer.email}
//                         onChange={(e) => handlePlayerChange(e, "email")}
//                         placeholder="Enter Player Email"
//                         className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                       />
//                       {errors.email && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       {/* <label>Player mobile Number</label> */}
//                       <input
//                         type="number"
//                         value={currentPlayer.mobile}
//                         onChange={(e) => handlePlayerChange(e, "mobile")}
//                         placeholder="Enter Mobile Number"
//                         className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                       />
//                       {errors.mobile && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.mobile}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       <label>Gender</label>
//                       <div className="flex gap-4">
//                         <label className="flex items-center">
//                           <input
//                             type="radio"
//                             name="gender"
//                             value="male"
//                             checked={currentPlayer.gender === "male"}
//                             onChange={(e) => handlePlayerChange(e, "gender")}
//                             className="mr-2"
//                           />
//                           Male
//                         </label>
//                         <label className="flex items-center">
//                           <input
//                             type="radio"
//                             name="gender"
//                             value="female"
//                             checked={currentPlayer.gender === "female"}
//                             onChange={(e) => handlePlayerChange(e, "gender")}
//                             className="mr-2"
//                           />
//                           Female
//                         </label>
//                         <label className="flex items-center">
//                           <input
//                             type="radio"
//                             name="gender"
//                             value="other"
//                             checked={currentPlayer.gender === "other"}
//                             onChange={(e) => handlePlayerChange(e, "gender")}
//                             className="mr-2"
//                           />
//                           Other
//                         </label>
//                       </div>
//                       {errors.gender && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.gender}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex flex-col text-gray-700 gap-2">
//                       <label>Upload ID Card Image</label>
//                       <input
//                         name="playerIdCard"
//                         type="file"
//                         onChange={handlePlayerImageChange}
//                         className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                       />
//                       {errors.playerIdCard && (
//                         <p className="text-red-600 text-sm mt-1">
//                           {errors.playerIdCard}
//                         </p>
//                       )}
//                     </div>

//                   </div>

//                   <button
//                     type="button"
//                     onClick={addPlayer}
//                     className="px-4 py-2 bg-orange-400 text-gray-100 rounded-lg shadow-md hover:bg-green-500 transition"
//                   >
//                     Add Player to List
//                   </button>
//                 </div>
//               )}

//               {formData.players.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                     Player Details
//                   </h3>
//                   <div className="md:hidden">
//                     {formData.players.map((player, index) => (
//                       <div
//                         key={index}
//                         className="bg-white/10 p-4 rounded-lg mb-4 text-gray-700 relative"
//                       >
//                         <button
//                          type="button"
//                           onClick={() => handleDeletePlayer(index)}
//                           className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                         >
//                           ❌
//                         </button>
//                         <p>
//                           <span className="font-bold">Name:</span> {player.name}
//                         </p>
//                         <p>
//                           <span className="font-bold">Enrollment:</span>{" "}
//                           {player.enrollment}
//                         </p>
//                         <p>
//                           <span className="font-bold">Mobile:</span>{" "}
//                           {player.mobile}
//                         </p>
//                         <p>
//                           <span className="font-bold">Email:</span>{" "}
//                           {player.email}
//                         </p>
//                         {/* <p>
//                           <span className="font-bold">Gender:</span>{" "}
//                           {player.gender}
//                         </p> */}
//                         {/* <p>
//                           <span className="font-bold">ID Card:</span>{" "}
//                           {player.playerIdCard ? (
//                             <img
//                               src={URL.createObjectURL(player.playerIdCard)}
//                               alt={`Player ${player.name}`}
//                               className="w-16 h-16 object-cover rounded-md mt-2"
//                             />
//                           ) : (
//                             "No playerIdCard"
//                           )}
//                         </p> */}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Desktop View */}
//                   <div className="hidden md:block overflow-x-auto">
//                     <table className="min-w-full table-auto text-gray-700 bg-white/30 rounded-lg shadow-md">
//                       <thead>
//                         <tr className="text-left">
//                           <th className="py-2 px-4">Player Name</th>
//                           <th className="py-2 px-4">Enrollment Number</th>
//                           <th className="py-2 px-4">Mobile Number</th>
//                           <th className="py-2 px-4">Email</th>
//                           {/* <th className="py-2 px-4">Gender</th>
//                           <th className="py-2 px-4">ID Card</th> */}
//                           <th className="py-2 px-4">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {formData.players.map((player, index) => (
//                           <tr key={index}>
//                             <td className="py-2 px-4">{player.name}</td>
//                             <td className="py-2 px-4">{player.enrollment}</td>
//                             <td className="py-2 px-4">{player.mobile}</td>
//                             <td className="py-2 px-4">{player.email}</td>
//                             {/* <td className="py-2 px-4">{player.gender}</td>
//                             <td className="py-2 px-4">
//                               {player.playerIdCard ? (
//                                 <img
//                                   src={URL.createObjectURL(player.playerIdCard)}
//                                   alt={`Player ${player.name}`}
//                                   className="w-16 h-16 object-cover rounded-md"
//                                 />
//                               ) : (
//                                 <span>No playerIdCard</span>
//                               )}
//                             </td> */}
//                             <td className="py-2 px-4">
//                               <button
//                                type="button"
//                                 onClick={() => handleDeletePlayer(index)}
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 ❌ Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//             {formData.players.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1, duration: 0.5 }}
//                 className="mt-6"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                   Select Captain
//                 </h2>
//                 <select
//                   name="captain"
//                   value={formData.captain}
//                   onChange={handleChange}
//                   className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                 >
//                   <option value="" className="text-gray-700">
//                     Select Captain
//                   </option>
//                   {formData.players.map((player, index) => (
//                     <option
//                       key={index}
//                       value={player.name}
//                       className="text-black"
//                     >
//                       {player.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.captain && (
//                   <p className="text-red-600 text-sm mt-1">{errors.captain}</p>
//                 )}
//               </motion.div>
//             )}
//             <hr className="border-t border-gray-600 my-8" />
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2, duration: 0.5 }}
//               className=""
//             >
//               <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                 Payment Details
//               </h2>
//               <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
//                 <div className="flex flex-col mb-4">
//                   <input
//                     type="text"
//                     name="transactionId"
//                     value={formData.transactionId}
//                     onChange={handleChange}
//                     placeholder="Enter Transaction ID"
//                     className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                   />
//                   {errors.transactionId && (
//                     <p className="text-red-600 text-sm mt-1">
//                       {errors.transactionId}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col mb-4">
//                   <input
//                     type="number"
//                     name="amount"
//                     value={formData.amount === 0 ? "" : formData.amount}
//                     onChange={handleChange}
//                     placeholder="Enter Amount Paid"
//                     required
//                     className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-lg mb-2">
//                   Transaction Receipt Image
//                 </label>
//                 <input
//                   type="file"
//                   name="transactionImage"
//                   accept="image/*"
//                   onChange={handleTransactionImageChange}
//                   className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
//                 />
//                 {errors.transactionImage && (
//                   <p className="text-red-600 text-sm mt-1">
//                     {errors.transactionImage}
//                   </p>
//                 )}
//               </div>
//               {formData.transactionImage && (
//                 <div className="">
//                   <img
//                     src={URL.createObjectURL(formData.transactionImage)}
//                     alt="Transaction Details"
//                     className="w-64 h-64 object-contain rounded-lg"
//                   />
//                 </div>
//               )}
//             </motion.div>
//             <hr className="border-t border-white/20 my-4" />
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.4, duration: 0.5 }}
//               className=""
//             >
//               <div className="flex items-center mb-4">
//                 <input
//                   type="checkbox"
//                   id="acceptance"
//                   required
//                   className="mr-2"
//                 />
//                 <label htmlFor="acceptance" className="text-gray-700">
//                   I hereby accept that I will abide by the Rules, Instructions
//                   and Guidelines of SPARDHA'25
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full mb-8 px-6 py-3 text-lg font-semibold bg-[#f5a937] text-white rounded-lg shadow-md hover:bg-yellow-500 transition flex items-center justify-center"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8H4z"
//                       ></path>
//                     </svg>
//                     Registring...
//                   </div>
//                 ) : (
//                   "Register Now"
//                 )}
//               </button>
//             </motion.div>
//           </form>
//         </motion.div>
//       </div>
//       <div className="flex relative top-[-12px] w-full max-w-2xl md:max-w-sm flex-col p-2 bg-white rounded-xl ">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-3xl bg-white p-8 rounded-2xl "
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             <h1 className="text-gray-700 text-center text-3xl mb-6">
//               Event Details:
//             </h1>
//             <p className="text-lg text-center text-gray-500 ">
//               <span className="font-bold text-gray-700">
//                 {selectedEvent?.sport || "NA"}
//               </span>
//             </p>
//             <div className="grid grid-cols-1">
//               <div>
//                 <p className="text-center text-gray-700">
//                   Minimum Players:{" "}
//                   <span className="text-base text-gray-500">
//                     {selectedEvent?.minPlayers || "NA"}
//                   </span>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-center text-gray-700">
//                   Substitution:{" "}
//                   <span className="text-base text-gray-500">
//                     {selectedEvent?.substitute || "NA"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <hr className="border-t border-gray-600 my-8" />
//           </motion.div>
//           <h2 className="text-gray-700 md:text-3xl text-center text-2xl font-extrabold mb-6">
//             Payment Option
//           </h2>
//           {selectedEvent?.qrImage && (
//             <div className="flex flex-col justify-center items-center rounded-lg">
//               <Image
//                 src={selectedEvent?.qrImage || "/qr.jpg"}
//                 alt="QR Code"
//                 width={220}
//                 height={220}
//                 className="rounded-lg mb-4"
//               />
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-gray-700">
//                   ₹{selectedEvent?.entryFee || 0}
//                 </p>
//                 <p className="text-xl text-gray-500 mt-2">
//                   UPI ID: bhanujsobti01@okaxis
//                 </p>
//               </div>
//             </div>
//           )}
//           <hr className="border-t border-gray-600 my-7" />
//           <div className="grid grid-cols-1  gap-6">
//             <div className="text-gray-700 text-lg space-y-4">
//               <div className="bg-[#f5a937] w-full flex justify-center items-center text-white px-6 py-3 font-semibold rounded-full">
//                 <h3>NEFT Bank Details:</h3>
//               </div>
//               <div className="space-y-2">
//                 <p className="font-semibold">
//                   A/c Name: <span className="text-gray-500">BHANUJ SOBTI</span>
//                 </p>
//                 <p className="font-semibold">
//                   A/c No:{" "}
//                   <span className="text-gray-500"> 918010087588719</span>
//                 </p>
//                 <p className="font-semibold">
//                   IFSC Code: <span className="text-gray-500">UTIB0000096</span>
//                 </p>
//                 <p className="font-semibold">
//                   Account Type: <span className="text-gray-500">Savings</span>
//                 </p>
//                 <p className="font-semibold">
//                   Branch Name:{" "}
//                   <span className="text-gray-500">
//                     Axis Bank, Paschim Vihar, New Delhi
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;
