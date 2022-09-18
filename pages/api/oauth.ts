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

  console.log(code);
  console.log(state);
  console.log({ SECRETS });

  if (!state) {
    res.status(500).end();
  }

  try {
    const response = await axios({
      url: "https://api.hellosign.com/v3/oauth/token",
      method: "POST",
      data: {
        state: state as string,
        code: code as string,
        clientId: SECRETS.clientId,
        clientSecret: SECRETS.clientSecret,
        grantType: "authorization_code",
      },
    });

    if (response.status === 200) {
      console.log({ response });
      res.status(200).send(response.data.body);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).end();
  }
}
