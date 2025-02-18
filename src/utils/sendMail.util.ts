import nodemailer from "nodemailer";

const sendMail = async (emailsData: string[] , subject: string, html: string) => {
  try {
    if (!emailsData || emailsData.length === 0) {
      throw new Error("Email list is empty.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailsData.join(","), // Ensure proper formatting
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message || error);
    return { success: false, message: `Failed to send email: ${error.message}` };
  }
};

export default sendMail;
