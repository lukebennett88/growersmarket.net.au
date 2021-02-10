import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const postmarkTransport = require('nodemailer-postmark-transport');

interface DataProps {
  email_address: string;
  full_name: string;
  message: string;
  subject: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const data: DataProps = JSON.parse(body);

  const transport = nodemailer.createTransport(
    postmarkTransport({
      auth: {
        apiKey: process.env.POSTMARK_SERVER_API_TOKEN,
      },
    })
  );

  const mail = {
    from: `services@phirannodesigns.com.au`,
    to: `services@phirannodesigns.com.au`,
    subject: `New Growers Market Contact Form Submission from ${data.full_name}`,
    html: `<div>
    <h1>New Growers Market Contact Form Submission</h1>
    <ul>
      <li>Name: ${data.full_name}</li>
      <li>Email: ${data.email_address}</li>
      <li>Subject: ${data.subject}</li>
      <li>Message: ${data.message}</li>
    </ul>
  </div>`,
  };

  // Send the email
  try {
    const info = await transport.sendMail(mail);
    // eslint-disable-next-line no-console
    console.log(info);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return res.status(200).json({
    message: 'Success',
  });
}
