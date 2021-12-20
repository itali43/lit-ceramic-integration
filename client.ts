import * as LitJsSdk from "lit-js-sdk";

export async function _startLitClient(window: Window) {
  console.log("Starting Lit Client...");
  const client = new LitJsSdk.LitNodeClient();
  client.connect();
  window.litNodeClient = client;
}
