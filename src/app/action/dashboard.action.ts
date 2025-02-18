"use server";
import eventModel from "@/models/event.model";
import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";

export const dashboardData = async () => {
  try {
    await dbConnect();
    const data = {
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
    };

    // Fetch all teams and events
    const teams = await TeamModel.find({ isDeleted: false });
    const events = await eventModel.find({});
    const timeSeriesData = await TeamModel.aggregate([
      {
        $match: { isDeleted: false }, // Filter out deleted teams
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by date
          },
          registrations: { $sum: 1 }, // Count registrations for each date
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          date: "$_id", // Rename _id to date
          registrations: 1, // Include the registrations count
        },
      },
      {
        $sort: { date: 1 }, // Sort by date in ascending order
      },
    ]);

    // Set total registration and events
    data.totalRegistration = teams.length;
    data.events = events.length;

    // Create a Set to store unique colleges
    const collegeSet = new Set();

    // Iterate over the teams to collect statistics
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      // Count teams by status
      if (team.status === "approved") {
        data.approved++;
        // Count the total payment
        data.totalPayment += team.amount;
      }
      if (team.status === "rejected") data.rejected++;
      if (team.status === "pending") data.pending++;

      // Add the college to the Set to get unique colleges
      collegeSet.add(team.college);

      // Iterate over the players in each team
      for (let j = 0; j < team.players.length; j++) {
        const player = team.players[j];

        // Count total players
        data.totalPlayer++;

        // Count male and female players
        if (player.gender === "male") data.male++;
        if (player.gender === "female") data.female++;
      }
    }

    // Set the number of unique colleges
    data.college = collegeSet.size;

    return {
      message: "Data fetched successfully",
      success: true,
      data: JSON.stringify(data),
      timeSeriesData: JSON.stringify(timeSeriesData),
    };
  } catch (error: any) {
    return {
      message: error.message || "internal error",
      success: false,
    };
  }
};
