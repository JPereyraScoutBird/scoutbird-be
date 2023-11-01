// import fetch from 'node-fetch';
const { Sha256 } = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { default: fetch, Request } = require("node-fetch");

const region = process.env.REGION;

const apiKey = process.env.API_SCOUTBIRD_GRAPHQLAPIKEYOUTPUT || null;

console.log("apikey appsync: ", apiKey)

exports.appsyncRequest = async (query) => {
  const graphqlEndpointUrl = new URL(
    process?.env?.API_SCOUTBIRD_GRAPHQLAPIENDPOINTOUTPUT || ""
  );
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: region,
    service: "appsync",
    sha256: Sha256,
  });
  const headers = {
    "Content-Type": "application/json",
    host: graphqlEndpointUrl.host,
  };
  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers,
    hostname: graphqlEndpointUrl.host,
    body: JSON.stringify(query),
    path: graphqlEndpointUrl.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(graphqlEndpointUrl, signed);

  let statusCode = 200;
  let data;

  try {
    const response = await fetch(request);
    data = await response.json();
    if (data.errors) {
      statusCode = 400;
    }
  } catch (error) {
    statusCode = 500;
    data = {
      error: error?.message,
    };
  }
  if (data?.errors) {
    console.error({ errors: data?.errors });
  }
  return data;
};
