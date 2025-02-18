import teamIdModel from "@/models/teamId.model";

 const teamIdGenerate = async () => {
    try {
        const lastTeam = await teamIdModel.findOne().sort({ teamId: -1 });
        const newTeamId = lastTeam ? lastTeam.teamId + 1 : 10000;

        const createdTeam = await teamIdModel.create({ teamId: newTeamId });
        return createdTeam.teamId;

    } catch (error) {
        console.error("Error generating team ID:", error);
        throw error;
    }
};
export default teamIdGenerate;
