import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "querystring";

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
    const response = await axios({
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

    const hasToken = response?.data.access_token && response.data.refresh_token && response.data.expires_in;

    if (response.status === 200 && hasToken) {
      let params = querystring.stringify({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      });

      res.redirect(`/auth/success?${params}`);
    } else {
      throw new Error("Bad response");
    }
  } catch (error) {
    console.log("Failed to obtain token", error);
    res.status(500).send(error);
  }
}
