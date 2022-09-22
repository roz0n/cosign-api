import type { NextApiRequest, NextApiResponse } from "next";
import * as HelloSignSDK from "hellosign-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let api = new HelloSignSDK.SignatureRequestApi();
    api.username = process.env.API_KEY!;

    const signer: HelloSignSDK.SubSignatureRequestSigner = {
      emailAddress: "arnold@rozon.org",
      name: "Arnold",
      order: 0,
    };

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
      title: "Test Signature Request 1",
      subject: "Testing Signature Request API",
      message: "Please sign this NDA and then we can discuss more. Let me know if you have any questions.",
      signers: [signer],
      ccEmailAddresses: ["arnoldrozon@gmail.com"],
      fileUrl: ["https://saclaw.org/wp-content/uploads/sbs-notice-of-automatic-stay.pdf"],
      metadata: {
        custom_id: 1,
      },
      signingOptions,
      fieldOptions,
      testMode: true,
    };

    const response = await api.signatureRequestSend(data);

    if (response.body) {
      res.status(200).send(response.body);
    }
  } catch (error) {
    console.log("Failed to create new signature request", error);
    res.status(500).json({ error: "Failed to create new signature request" });
  }
}
