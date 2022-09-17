import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

const SECRETS = {
  apiKey: process.env.API_KEY!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<HelloSignSDK.OAuthTokenResponse>) {
  const { code, state } = req.query;

  if (!state) {
    res.status(500);
  }

  try {
    const hs = new HelloSignSDK.OAuthApi();
    const request = new HelloSignSDK.OAuthTokenGenerateRequest();

    hs.username = SECRETS.apiKey;
    request.state = state as string;
    request.code = code as string;
    request.clientId = SECRETS.clientId;
    request.clientSecret = SECRETS.clientSecret;
    request.grantType = "authorization_code";

    const response = await hs.oauthTokenGenerate(request);

    if (response.body) {
      res.json(response.body);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500);
  }
}
