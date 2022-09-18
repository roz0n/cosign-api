import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";
import axios from "axios";

const SECRETS = {
  apiKey: process.env.API_KEY!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  if (!state) {
    res.status(500).send({ error: "state_mismatch" });
  }

  console.log("code", code);
  console.log("state", state);

  try {
    const response = await axios({
      url: "https://app.hellosign.com/oauth/token",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: {
        state: state,
        code: code,
        clientId: SECRETS.clientId,
        clientSecret: SECRETS.clientSecret,
      },
      params: {
        grantType: "authorization_code",
      },
    });

    console.log(response.status);
    console.log(response.statusText);

    if (response.status === 200) {
      res.status(200).json(response.data.body);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    res.status(500).send({ error: "Failed to fetch token" });
  }
}
