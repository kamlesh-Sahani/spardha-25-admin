"use client";
import { dashboardData } from "@/app/action/dashboard.action";
import Loader from "@/components/Loader";
import {
  ClipboardList,
  Users,
  Gamepad,
  IndianRupee,
  School,
  User,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function Dashboard() {
  // State to store the fetched dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    totalRegistration: 0,
    totalPlayer: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    male: 0,
    female: 0,
    college: 0,
    events: 0,
    totalPayment: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] =
    useState<{ title: string; value: number | string; icon: ReactNode }[]>();
  const [barData, setBarData] = useState<{ name: string; value: number }[]>();
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>();
  const [timeSeriesData, setTimeSeriesData] =
    useState<{ date: string; registrations: number }[]>();
  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await dashboardData();
        setDashboardStats(JSON.parse(res.data!));
        setTimeSeriesData(JSON.parse(res.timeSeriesData!));
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const COLORS = ["#0088FE", "#FF8042"];

  useEffect(() => {
    setStats([
      {
        title: "Total Registration",
        value: dashboardStats.totalRegistration,
        icon: <ClipboardList className="w-6 h-6" />,
      },
      {
        title: "Player Registered",
        value: dashboardStats.totalPlayer,
        icon: <Users className="w-6 h-6" />,
      },
      {
        title: "Registrations Approved",
        value: dashboardStats.approved,
        icon: <CheckCircle className="w-6 h-6" />,
      },
      {
        title: "Registrations Rejected",
        value: dashboardStats.rejected,
        icon: <XCircle className="w-6 h-6" />,
      },
      {
        title: "Registrations Pending",
        value: dashboardStats.pending,
        icon: <Clock className="w-6 h-6" />,
      },
      {
        title: "Male Registrations",
        value: dashboardStats.male,
        icon: <User className="w-6 h-6" />,
      },
      {
        title: "Female Registrations",
        value: dashboardStats.female,
        icon: <UserCheck className="w-6 h-6" />,
      },
      {
        title: "Colleges Participated",
        value: dashboardStats.college,
        icon: <School className="w-6 h-6" />,
      },
      {
        title: "Active Events",
        value: dashboardStats.events,
        icon: <Gamepad className="w-6 h-6" />,
      },
      {
        title: "Total Payments",
        value: `₹ ${dashboardStats.totalPayment.toLocaleString()}`,
        icon: <IndianRupee className="w-6 h-6" />,
      },
    ]);

    setBarData([
      { name: "Approved", value: dashboardStats.approved },
      { name: "Rejected", value: dashboardStats.rejected },
      { name: "Pending", value: dashboardStats.pending },
    ]);

    setPieData([
      { name: "Male", value: dashboardStats.male },
      { name: "Female", value: dashboardStats.female },
    ]);
  }, [dashboardStats]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stats &&
              stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">{stat.title}</h3>
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Registration Trends Line Chart */}
          <Card className="mb-6 mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Registration Trends
              </CardTitle>
              <CardDescription>Registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-center">
                Registrations Status
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-center">
                Gender Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData &&
                      pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
