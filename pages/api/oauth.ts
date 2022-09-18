import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  if (!state) {
    res.status(500).send({ error: "state_mismatch" });
  }

  const SECRETS = {
    apiKey: process.env.API_KEY!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
  };

  try {
    let response = await axios({
      method: "POST",
      url: "https://app.hellosign.com/oauth/token",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        client_id: SECRETS.clientId,
        code: code,
        state: state,
        client_secret: SECRETS.clientSecret,
        grant_type: "authorization_code",
      },
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      throw new Error("Bad response");
    }
  } catch (error) {
    console.log("Failed to obtain token", error);
    res.status(500).send(error);
  }
}
