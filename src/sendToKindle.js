import path from 'node:path';
import nodemailer from 'nodemailer';
import { requireMailConfig } from './config.js';

export async function sendToKindle(filePath, title) {
  const { kindleEmail, senderEmail, smtp } = requireMailConfig();

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: kindleEmail,
      subject: title,
      text: `Sent by read-later-epub: ${title}`,
      attachments: [{ filename: path.basename(filePath), path: filePath }],
    });
  } catch (err) {
    if (err.code === 'EAUTH') {
      throw new Error(`SMTP login failed for ${smtp.user}. Check SMTP_USER and SMTP_PASS (Gmail needs an App Password).`);
    }
    throw err;
  }

  return kindleEmail;
}
