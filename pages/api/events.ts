// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type EventSuccessResponse = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<EventSuccessResponse>) {
  if (req.method === "POST") {
    res.status(200).json({ success: true });
  } else {
    res.status(500);
  }
}
