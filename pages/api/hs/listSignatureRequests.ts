import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // let { accessToken } = req.query;

    // console.log("ACCESS TOKEN", accessToken);

    // if (!accessToken) {
    //   res.status(500).send({ error: "No access token provided" });
    // }

    const api = new HelloSignSDK.SignatureRequestApi();
    api.username = process.env.API_KEY!;
    // api.accessToken = accessToken as string;

    const response = await api.signatureRequestList(undefined, 1);

    if (response.body) {
      res.status(200).send(response.body);
    }
  } catch (error) {
    console.log("Failed to list requests:", error);
    res.status(500).json({ error: "Failed to list requests" });
  }
}
