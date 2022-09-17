import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (req.method === "POST") {
    res.status(200).send("Hello API Event Received");
  } else {
    res.status(500);
  }
}
