import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import db from "~/database/db";
import transporter from "~/mail/mailer";
import { RowDataPacket } from "mysql2/promise";
import { generateVerificationCode } from "~/utils/utils";

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, gender, country, birthday } =
      req.body;

    try {
      const [existingUser] = (await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
      )) as RowDataPacket[];

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email_Exists" });
      }

      // Generate verification token expries 6 hours from now

      // const verificationToken = bcrypt.hashSync(email + Date.now(), 10);
      const verificationToken = generateVerificationCode();
      const verificationTokenExpiresAt = new Date(
        Date.now() + 6 * 60 * 60 * 1000
      );

      // // Insert user into the database

      await db.execute(
        "INSERT INTO users (first_name, last_name, email, password, gender, country, birthday, verification_token, verification_token_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          firstName,
          lastName,
          email,
          bcrypt.hashSync(password, 10),
          gender,
          country,
          birthday,
          verificationToken,
          verificationTokenExpiresAt,
        ]
      );

      const [newUser] = (await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      )) as RowDataPacket[];

      // // Send verification email

      // await transporter.sendMail({
      //   to: "bestwing915@gmail.com",
      //   subject: "Email Verification",
      //   html: `
      //     <h1>Verify Your Email</h1>
      //     <p>Click the link below to verify your email:</p>
      //     <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}">Verify Email</a>
      //   `,
      // });

      res.status(200).json({ newUser: newUser[0] });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default signupHandler;
