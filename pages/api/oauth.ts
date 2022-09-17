import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

const SECRETS = {
  apiKey: process.env.API_KEY!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;

  if (!state) {
    res.status(500);
  }

  try {
    const hs = new HelloSignSDK.OAuthApi();
    hs.setApiKey(SECRETS.apiKey);

    let token = await hs.oauthTokenGenerate({
      state: state as string,
      code: code as string,
      clientId: SECRETS.clientId,
      clientSecret: SECRETS.clientSecret,
      grantType: "authorization_code",
    });

    if (token) {
      res.json(token);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500);
  }
}
