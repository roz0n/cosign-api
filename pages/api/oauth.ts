import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

const SECRETS = {
  apiKey: process.env.API_KEY!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<HelloSignSDK.OAuthTokenResponse>) {
  try {
    const { code, state } = req.query;

    console.log(code);
    console.log(state);

    if (!state) {
      res.status(500).end();
    }

    const hs = new HelloSignSDK.OAuthApi();
    hs.username = SECRETS.apiKey;

    console.log("A");

    const request = new HelloSignSDK.OAuthTokenGenerateRequest();
    request.state = state as string;
    request.code = code as string;
    request.clientId = SECRETS.clientId;
    request.clientSecret = SECRETS.clientSecret;
    request.grantType = "authorization_code";

    console.log("B");

    const response = await hs.oauthTokenGenerate(request);

    console.log("C");
    if (response.body) {
      console.log("D");

      res.status(200).send(response.body);
    } else {
      console.log("E");
      throw new Error();
    }
  } catch (error) {
    console.log("F");
    res.status(500).end();
  }
}
