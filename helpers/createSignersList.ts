import * as HelloSignSDK from "hellosign-sdk";

export function createSignersList(
  signers: { emailAddress: string; name: string }[]
): HelloSignSDK.SubSignatureRequestSigner[] {
  let output: HelloSignSDK.SubSignatureRequestSigner[] = [];
  signers.forEach((signer) => output.push(signer));
  return output;
}
