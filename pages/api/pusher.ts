import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import pusherOptions from "../helpers/pusherOptions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: true });
    }

    if (!req.body) {
      res.status(400).json({ error: true });
    }

    const pusher = new Pusher(pusherOptions);
    let pusherResponse = await pusher.trigger("channel", "event", req.body!);

    if (pusherResponse.status !== 200) {
      throw new Error("Pusher failed");
    } else {
      res.status(200).end("success");
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
}
