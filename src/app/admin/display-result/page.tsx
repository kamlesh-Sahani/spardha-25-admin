"use client";
import { useEffect, useState, useMemo } from "react";
import ReactSelect, { SingleValue } from "react-select";

interface SportsResult {
  event: string;
  winner: { college: string; points: number };
  runnerUp: { college: string; points: number };
}

interface SelectOption {
  value: string;
  label: string;
}

const SportsPointsPage = () => {
  const [data, setData] = useState<SportsResult[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-result");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute leaderboard dynamically
  const leaderboard = useMemo(() => {
    const pointsTable: Record<string, number> = {};

    data.forEach(({ winner, runnerUp }) => {
      pointsTable[winner.college] =
        (pointsTable[winner.college] || 0) + winner.points;
      pointsTable[runnerUp.college] =
        (pointsTable[runnerUp.college] || 0) + runnerUp.points;
    });

    return Object.entries(pointsTable)
      .sort((a, b) => b[1] - a[1])
      .map(([college, points]) => ({ college, points }));
  }, [data]);

  // Generate event filter options
  const eventOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: "All Events" },
      ...Array.from(new Set(data.map((item) => item.event))).map((event) => ({
        value: event,
        label: event,
      })),
    ],
    [data]
  );

  // Filtered results based on selected event
  const filteredData = useMemo(
    () =>
      selectedEvent
        ? data.filter((item) => item.event === selectedEvent)
        : data,
    [data, selectedEvent]
  );

  const handleFilterChange = (newValue: SingleValue<SelectOption>) => {
    setSelectedEvent(newValue?.value || null);
  };
  const handleDelete = async (event: string) => {
    if (!confirm(`Are you sure you want to delete the event "${event}"?`))
      return;

    try {
      const response = await fetch(
        `/api/result?event=${encodeURIComponent(event)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete event");

      setData((prevData) => prevData.filter((item) => item.event !== event));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting event");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sports Points Leaderboard
      </h1>

      <div className="mb-6">
        <ReactSelect
          options={eventOptions}
          placeholder="Filter by Event"
          isClearable
          onChange={handleFilterChange}
          defaultValue={eventOptions[0]}
        />
      </div>

      {/* Sports Results Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Winner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Runner-Up
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            ) : (
              filteredData.map((result, index) => (
                <tr
                  key={`${result.event}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {result.event}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {result.winner.college}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {result.winner.points}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                    {result.runnerUp.college}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {result.runnerUp.points}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(result.event)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Overall Leaderboard
        </h2>
        <ul>
          {leaderboard.map((team, index) => (
            <li
              key={team.college}
              className={`flex justify-between p-3 rounded-md ${
                index === 0
                  ? "bg-yellow-100 font-bold"
                  : index === 1
                  ? "bg-gray-100"
                  : "bg-white"
              } mb-2`}
            >
              <span>
                {index + 1}. {team.college}
              </span>
              <span>{team.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SportsPointsPage;
