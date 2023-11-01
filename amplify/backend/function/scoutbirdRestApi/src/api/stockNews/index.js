"use strict";

const aws = require("aws-sdk");
const NewsAPI = require("newsapi");
const dayjs = require("dayjs");

module.exports = async () => {
  let apiKey;

  // Mock
  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_NEWSAPI;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_NEWSAPI"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  const newsApiClient = new NewsAPI(apiKey);

  console.log("apiKey", apiKey)

  const terms = [
    `"interest rate"`,
    `"Total Population"`,
    `"Population growth"`,
    `"consumer prices"`,
    `"Consumer Price Index"`,
    `"GDP per capita"`,
    `"GDP growth"`,
    `Debt`,
    `"net goods"`,
    `Inflation`,
    `Agriculture`,
    `Industry`,
    `Services`,
    `Exports`,
    `Imports`,
    `"Gross capital"`,
    `migration`,
    `GNI`,
    `"Life expectancy"`,
    `"Surface area"`,
    `Poverty`,
    `"Cash surplus"`,
    `"Cash deficit"`,
  ]  
  const terms2 = [
    `"Life expectancy"`,
    `"Fertility rate"`,
    `HIV`,
    `CO2`,
    `"Surface area"`,
    `Poverty`,
    `"Cash surplus"`,
    `"Cash deficit"`,
    `Startup`,
    `"Mobile subscriptions"`,
    `"Internet users"`,
    `"technology exports"`,
    `trade`,
    `Unemployment`
  ]
  

  const excludeFromSearch ="NOT Why NOT Movers NOT hate NOT LGBT NOT Partner NOT app NOT Stewart NOT Trump";
  
  const excludeMacro = 
    "NOT Miner NOT GOP NOT Obama NOT Trump NOT Politics NOT Pelosi NOT rewards NOT transcrip";

  const excludeDomainsMacro =
    "slickdeals.net,ibtimes.com,freerepublic.com,fxempire.com,econbrowser.com";

  const excludeDomains =
    "thefly.com,fool.com,yahoo.com,seekingalpha.com,wsj.com,biztoc.com,slickdeals.net,ibtimes.com,freerepublic.com,econbrowser.com,timesnownews.com,globenewswire.com,neowin.net,thestar.com,theinformation.com,webpronews.com,nextbigwhat.com,afr.com,minimalistbaker.com";

  return {
    everything: async (companyName, page) =>
      await newsApiClient.v2.everything({
        from: dayjs().subtract(3, "days").format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD"),
        q: `"${companyName}" ${excludeFromSearch}`,
        excludeDomains,
        searchin: "title",
        language: "en",
        pageSize: 100,
        page: page
      }),
    macroeconomic: async (page) => {
      const res =  await newsApiClient.v2.everything({
        from: dayjs().subtract(3, "days").format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD"),
        q: `(${terms.join(" OR ")}) AND (GDP OR macroeconomic OR economy) ${excludeMacro}`,
        excludeDomainsMacro,
        searchin: "title",
        language: "en",
        pageSize: 100,
        page: page
      })

      return res
    }
  };
};