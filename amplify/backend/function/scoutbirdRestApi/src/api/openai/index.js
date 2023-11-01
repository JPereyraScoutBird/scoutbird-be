"use strict";

const aws = require("aws-sdk");
const { Configuration, OpenAIApi } = require("openai");

module.exports = async () => {
  let apiKey;

  // Mock
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_OPENAI;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_OPENAI"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }
  const configuration = new Configuration({
    apiKey,
  });

  console.log("API KEY: ", apiKey)

  const openApiClient = new OpenAIApi(configuration);

  return {
    generateTitle: async (title) =>
      await openApiClient.createCompletion({
        model: "text-davinci-002",
        prompt: `Rewrite text as very short clickable headline ${title}`,
        temperature: 0.4,
        max_tokens: 45,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      }),
  };
};
