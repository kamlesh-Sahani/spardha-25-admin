import TeamModel from "@/models/team.model";
import dbConnect from "@/utils/dbConnect.util";
import sendMail from "@/utils/sendMail.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { _id, status, reason } = await req.json();
    const team = await TeamModel.findById(_id);
    if (!team) {
      return NextResponse.json(
        {
          success: false,
          message: "team is not found",
        },
        { status: 400 }
      );
    }
    if (team.status == status) {
      return NextResponse.json(
        {
          message: `Status is alreasy ${status}`,
          success: true,
        },
        { status: 400 }
      );
    }
    team.status = status;
    if (reason) {
      team.reason = reason;
    }

    let captainEmail = [] as string[];

    for (let i = 0; i < team.players.length; i++) {
      if (team.players[i].isCaptain) {
        captainEmail.push(team.players[i].email!);
      }
    }
    const collegeEmail = process.env.EMAIL_USER!;
    const teamDetailLink = `${process.env.BASE_URL}/profile?pass=${team.password}`;
    const whatsappGroupLink = team.whatsapp;
    await team.save({ validateBeforeSave: false });

        const htmlTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #eef4fc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: #0073e6;
            color: #fff;
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 12px;
            font-size: 15px;
            color: #333;
        }
        .status {
            padding: 8px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
            color: #fff;
            display: inline-block;
            min-width: 120px;
        }
        .approved { background: #009688; }  /* Teal */
        .rejected { background: #d32f2f; }  /* Red */
        .pending { background: #fbc02d; }  /* Yellow */
        .reason {
            background: #f0f8ff;
            padding: 8px;
            border-radius: 5px;
            font-size: 14px;
            margin-top: 10px;
            color: #0073e6;
            text-align: left;
            border-left: 4px solid #0073e6;
        }
        .footer {
            margin-top: 15px;
            font-size: 13px;
            color: #555;
        }
        .cta-button {
            padding: 8px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
            color: #0073e6;
            display: inline-block;
            min-width: 120px;
            background: #f0f8ff;
            text-decoration: none;
        }
     
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Team Status Update</div>
        <div class="content">
            <p>Hello Team-<strong>${team.teamID}</strong>,</p>
            <p>Your team status has been updated:</p>
            <div class="status ${status}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
            ${status === 'approved' ? '<p>🎉 Congratulations! Your team is approved.</p>' : ''}
            ${status === 'rejected' ? '<p>⚠️ Unfortunately, your request was not approved.</p>' : ''}
            ${reason ? `<div class="reason"><strong>Reason:</strong> ${reason}</div>` : ""}
             <p>Passwod <span class="cta-button">${team.password}</span></p>
            <p>Check your team details below:</p>
            <a href="${teamDetailLink}" class="cta-button">View Team Details</a>
             ${status === 'approved' ? `
                <p>Join the official WhatsApp group for updates:</p>
                <p><a href="${whatsappGroupLink}" class="cta-button">Join WhatsApp Group</a></p>
            ` : ''}
            <p>Need help? Contact the Spardha Team.</p>
            <a href="mailto:${collegeEmail}" class="cta-button">Contact Spardha Team</a>
            
        </div>
        <div class="footer">
            Best regards,<br>
            <strong>Spardha Team</strong>
        </div>
    </div>
</body>
</html>
`
        await sendMail(captainEmail,`Status Update for Team ${team.teamID}`,htmlTemplate)
        return NextResponse.json({
            message:"Status successfuly Updated ",
            success:true
        },{status:200});
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message || "internal error"
        },{status:500})
    }
}
