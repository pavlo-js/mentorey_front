import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 587,
  secure: false,
  auth: {
    user: "bestwing",
    pass: "silver915",
  },
});

export default transporter;
