import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token: refreshToken } = req.query;

  if (!refreshToken) {
    res.status(500).send({ error: "No refresh token provided" });
  }

  try {
    const response = await axios({
      method: "POST",
      url: "https://app.hellosign.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      throw new Error("Bad response");
    }
  } catch (error) {
    console.log("Failed to obtain new token", error);
    res.status(500).send(error);
  }
}
