import type { NextApiRequest, NextApiResponse } from "next";

type HeartbeatResponse = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<HeartbeatResponse>) {
  res.status(200).json({ success: true });
}
