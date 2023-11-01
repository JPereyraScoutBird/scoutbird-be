/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_SCOUTBIRDRESTAPI_NAME
	REGION
Amplify Params - DO NOT EDIT */

// require("dotenv").config();
const { stocksList } = require("./constants/stocks");

const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const { FUNCTION_SCOUTBIRDRESTAPI_NAME } = process.env;

const buildParams = (stocks) => {
  const payload = {
    httpMethod: "POST",
    path: "/newsdata",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stocks),
  };

  const params = {
    FunctionName: FUNCTION_SCOUTBIRDRESTAPI_NAME,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(payload),
  };
  return params
}

/**
 * 
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log({ stocksList });
  console.log(FUNCTION_SCOUTBIRDRESTAPI_NAME);
  const lambdaClient = new LambdaClient();

  try {
    console.log("here")
    // console.log(payload)
    // stocksList.forEach(stock => {
    for(const stock of stocksList) {
      console.log("stock: ", stock)
      const invokeCommand = new InvokeCommand(buildParams([stock]));
      lambdaClient.send(invokeCommand);
      console.log("done", stocksList.slice(-1))
      if(stock == stocksList.slice(-1)[0]) {
        return ({
          statusCode: 200,
          //  Uncomment below to enable CORS requests
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
          body: JSON.stringify(""),
        });
      }
    };
  } catch (error) {
    console.error(error);
  }

  
};
