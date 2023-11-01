"use strict";

const aws = require("aws-sdk");

const { LanguageServiceClient } = require("@google-cloud/language");
const { GoogleAuth, grpc } = require("google-gax");

function getApiKeyCredentials(apiKey) {
  const sslCreds = grpc.credentials.createSsl();
  const googleAuth = new GoogleAuth();
  const authClient = googleAuth.fromAPIKey(apiKey);
  const credentials = grpc.credentials.combineChannelCredentials(
    sslCreds,
    grpc.credentials.createFromGoogleCredential(authClient)
  );
  return credentials;
}

module.exports = async () => {
  let apiKey;

  // Mock
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_GOOGLEAPI;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_GOOGLEAPI"].map(
          (secretName) => process.env[secretName]
        ),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  const googleCredentials = getApiKeyCredentials(apiKey);

  const languageServiceClient = new LanguageServiceClient({
    sslCreds: googleCredentials,
  });

  return {
    sentimentAnalysis: async (text) => {
      const document = {
        content: text,
        type: "PLAIN_TEXT",
      };
      const sentimentAnalysisResponse =
        await languageServiceClient.analyzeSentiment({
          document,
        });
      return sentimentAnalysisResponse;
    },
    classifyText: async (text) => {
      const document = {
        content: text,
        type: "PLAIN_TEXT",
      };

      const classificationModelOptions = {
        v2Model: {
          contentCategoriesVersion: "V2",
        },
      };

      const classifyTextResponse = await languageServiceClient.classifyText({
        document,
        classificationModelOptions,
      });
      return classifyTextResponse;
    },
  };
};