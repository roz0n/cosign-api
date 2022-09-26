import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { signatureId } = req.query;

    if (!signatureId) {
      res.status(500).send({ error: "Invalid id provided" });
    }

    const api = new HelloSignSDK.SignatureRequestApi();
    api.username = process.env.API_KEY!;
    // api.accessToken = accessToken as string;

    const response = await api.signatureRequestGet(signatureId as string);

    if (response.body) {
      console.log("SINGLE GET RESPONSE", response.body);
      res.status(200).send(response.body);
    }
  } catch (error) {
    console.log("Failed get signature request:", error);
    res.status(500).json({ error: "Failed to get signature request" });
  }
}
