import { EventCallbackAccountRequestPayload } from "hellosign-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "../../clients/pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: true });
    }

    const { event, signatureRequest } = req.body as EventCallbackAccountRequestPayload;

    if (!event) {
      res.status(400).json({ error: true });
    }

    const response = await Pusher.trigger("cosign", "app-event", { event, signatureRequest });

    if (response.status === 200) {
      res.status(200).send("Hello API Event Received");
    } else {
      throw new Error("Invalid Pusher response");
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
}
