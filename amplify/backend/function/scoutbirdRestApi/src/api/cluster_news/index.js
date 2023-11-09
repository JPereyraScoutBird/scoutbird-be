/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_EVERLASTINGV3_NAME
	REGION
Amplify Params - DO NOT EDIT */

// require("dotenv").config();
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

// const { FUNCTION_EVERLASTINGV3_NAME } = process.env;
const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://financialmodelingprep.com/api/v4";

module.exports = async () => {
//   arn:aws:lambda:us-east-1:074931833817:function:news_clustering

  const params = (ticker) => ({
    FunctionName: 'news_clustering',
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({
        // "type": "quick_cluster_init",
        // "ticker": "AAPL",
        // "from_date_str": "2023-10-01",
        // "to_date_str": "2023-10-16",
        // "min_similarity_thresh": 0.6
        "type": "read_from_db",
        "ticker": ticker,
        "first": 10
      }),
  });
  
  //   return params
  return {
    search: async (ticker) => {
        const lambdaClient = new LambdaClient();

        try {
            const invokeCommand = new InvokeCommand(params(ticker));
            const res = await lambdaClient.send(invokeCommand);
            jsonRes = JSON.parse(Buffer.from(res.Payload).toString('utf8'))
            return (
              jsonRes.body
            );

        } catch (error) {
            console.error(error);
        }
    }
}};
