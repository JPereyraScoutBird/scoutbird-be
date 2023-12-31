"use strict";

const aws = require("aws-sdk");
const SerpApi = require("google-search-results-nodejs");
const moment = require('moment')
const TICKERS = require('../../ticker');

module.exports = async () => {
  let apiKey;

  if (process.env.MOCK === "true") {
    apiKey = process.env.API_KEY_SERPAPI;
  } else {
    const {
      // Null to mock the return random data
      Parameters: [{ Value }],
    } = await new aws.SSM()
      .getParameters({
        Names: ["API_KEY_SERPAPI"].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    apiKey = Value;
  }

  const searchClient = new SerpApi.GoogleSearch(apiKey);

  const query_params = {
    google_domain: "google.com",
    location: "Austin, TX",
    device: "desktop",
    hl: "en",
    gl: "us",
    safe: "active",
    num: 500,
    start: 0,
    tbs: "qdr:M",
    async: false, // allow async query
    output: "json", // output format
  };

  const query_params2 = {
    google_domain: "google.com",
    location: "United States",
    device: "desktop",
    hl: "en",
    gl: "us",
    safe: "active",
    num: 100,
    start: 0,
    tbs: "qdr:Y",
    async: false, // allow async query
    output: "json", // output format
  };

  const myRegExp = /^(\d+)\s(\w+)\sago$/;


  return {
    redditApi: (ticker) => {
      return new Promise((res, rej) => {
        searchClient.json(
          {
            q: `${ticker} site:www.reddit.com`,
            ...query_params,
          },
          (data, error) => {
            if (error) {
              return rej(error);
            }
            const { organic_results: organicResults } = data;
            
            const organicResults2 = organicResults.map(x => {
              if(myRegExp.test(x.date)) {
                console.log(x.date)
                const results = myRegExp.exec(x.date);
                const num = results[1];
                const duration = results[2];
                const new_date = moment().subtract(duration,num).format("MMMM Do, YYYY")
                console.log(new_date)
                return ({...x, date: new_date})
              }
              return ({...x})
            })
            return res(organicResults2);
          }
        );
      });
    },
    linkedinApi: (ticker) => {
      return new Promise((res, rej) => {
        searchClient.json(
          {
            q: `${TICKERS[ticker]} site:www.linkedin.com`,
            ...query_params,
          },
          (data, error) => {
            if (error) {
              return rej(error);
            }
            const { organic_results: organicResults } = data;
            
            const organicResults2 = organicResults.map(x => {
              if(myRegExp.test(x.date)) {
                console.log(x.date)
                const results = myRegExp.exec(x.date);
                const num = results[1];
                const duration = results[2];
                const new_date = moment().subtract(duration,num).format("MMMM Do, YYYY")
                console.log(new_date)
                return ({...x, date: new_date})
              }
              return ({...x})
            })
            return res(organicResults2);
          }
        );
      });
    },
    substackApi: async (ticker) => {
      return new Promise((res, rej) => {
        searchClient.json(
          {
            q: `${ticker} site:substack.com`,
            ...query_params2,
          },
          (data, error) => {
            if (error) {
              return rej(error);
            }
            const { organic_results: organicResults } = data;

            const organicResults2 = organicResults.map(x => {
              if(myRegExp.test(x.date)) {
                console.log(x.date)
                const results = myRegExp.exec(x.date);
                const num = results[1];
                const duration = results[2];
                const new_date = moment().subtract(duration,num).format("MMMM Do, YYYY")
                return ({...x, date: new_date})
              }
              return ({...x})
            })
            return res(organicResults2);
          }
        );
      });
    },
  };
};
