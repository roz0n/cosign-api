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
      url: "https://app.hellosign.com/oauth/token?grant_type=authorization_code",
      method: "POST",
      params: {
        state: state,
        code: code,
        grantType: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      res.status(200).json(response.data.body);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error fetching token" });
  }
}
