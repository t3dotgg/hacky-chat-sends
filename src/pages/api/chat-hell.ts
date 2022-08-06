import { NextApiRequest, NextApiResponse } from "next";

import tmi from "tmi.js";

export default async function ChatApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req", req.query);

  const channel = req.query.channel! as string;
  const message = req.query.message! as string;

  const username = req.query.username! as string;
  const token = req.query.token! as string;

  const client = tmi.client({
    channels: [channel],
    identity: {
      username,
      password: "oauth:" + token,
    },
    options: {},
  });

  await client.connect();

  await client.say(channel, message);

  res.status(200).json({ message: "hi" });
}

// localhost:3000/api/chat-hell?channel=theo&message=testing&username=probabynottheo&token=39hb0f9hsyc08yi7xbb2t6rha2glwe
