import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: true });
    }

    if (!req.body) {
      res.status(400).json({ error: true });
    }

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
    });

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
