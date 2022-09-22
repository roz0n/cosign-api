import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body) {
      throw new Error();
    }

    const { title, subject, message, signers, ccEmailAddresses, fileUrl } = req.body;

    if (!title || !subject || !signers) {
      throw new Error();
    }

    const api = new HelloSignSDK.SignatureRequestApi();
    api.username = process.env.API_KEY!;

    const fieldOptions: HelloSignSDK.SubFieldOptions = {
      dateFormat: HelloSignSDK.SubFieldOptions.DateFormatEnum.DD_MM_YYYY,
    };

    const signingOptions: HelloSignSDK.SubSigningOptions = {
      draw: true,
      type: true,
      upload: true,
      phone: false,
      defaultType: HelloSignSDK.SubSigningOptions.DefaultTypeEnum.Draw,
    };

    const data: HelloSignSDK.SignatureRequestSendRequest = {
      title,
      subject,
      message,
      signers: signers,
      ccEmailAddresses,
      fileUrl,
      signingOptions,
      fieldOptions,
      testMode: true,
    };

    const response = await api.signatureRequestSend(data);

    if (response.body) {
      res.status(200).send(response.body);
    }
  } catch (error) {
    console.log("Failed to create new signature request:", error);
    res.status(500).json({ error: "Failed to create new signature request" });
  }
}
