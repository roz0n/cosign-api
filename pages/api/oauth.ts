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
    // const response = await axios({
    //   url: "https://app.hellosign.com/oauth/token?grant_type=authorization_code",
    //   method: "POST",
    //   params: {
    //     state: state,
    //     code: code,
    //     grant_type: "authorization_code",
    //     client_id: SECRETS.clientId,
    //     client_secret: SECRETS.clientSecret,
    //   },
    // });

    // if (response.status === 200) {
    //   res.status(200).json(response.data.body);
    // } else {
    //   throw new Error();
    // }

    let response = await fetch("https://app.hellosign.com/oauth/token?grant_type=authorization_code", {
      method: "POST",
      body: JSON.stringify({
        state: state,
        code: code,
        clientId: SECRETS.clientId,
        clientSecret: SECRETS.clientSecret,
        grant_type: "authorization_code",
      }),
    });

    if (response.status === 200) {
      res.status(200).json(response.body);
    } else {
      console.log(response.body);
      throw new Error("Status is not 200");
    }
  } catch (error) {
    console.log("Error:");
    console.log(error);
    res.status(500).send({ error: "Error fetching token" });
  }
}
