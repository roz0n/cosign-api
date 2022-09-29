import type { NextApiRequest, NextApiResponse } from "next";
import pusherOptions from "../../helpers/pusherOptions";

const Pusher = require("pusher");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: true });
    }

    if (!req.body) {
      res.status(400).json({ error: true });
    }

    const pusher = new Pusher(pusherOptions);
    const response = await pusher.trigger("hs", "update", req.body);

    if (response.status === 200) {
      res.status(200).send("Hello API Event Received");
    } else {
      throw new Error("Invalid Pusher response");
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
}
