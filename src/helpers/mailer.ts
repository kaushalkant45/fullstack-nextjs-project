import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //configure mail for uses
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7a04df64c359ee", //🔥❌
        pass: "761019685dd468", //🔥❌
      },
    });

    const mailOptions = {
      from: "kkm@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a herf="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"></a>to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }or copy and paste the link below in your browser.</br>${
        process.env.DOMAIN
      }/verifyemail?token${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
