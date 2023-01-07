import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = "ACc7e9048ec9e2f90bca437e87168e5ef4";
  const token = "f54c167d9c0f4db1a509621a3b536b1b";
  const client = twilio(accountSid, token);
  const { phone, message } = req.body;
  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: "+16692807968",
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}