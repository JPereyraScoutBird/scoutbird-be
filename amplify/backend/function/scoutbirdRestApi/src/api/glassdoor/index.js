const { default: axios } = require("axios");

const baseUrl = "https://api.glassdoor.com/api/api.htm";

module.exports = async () => {
  return {
    search: async (ticker) => {
      const params = {
        "t.p": "120",
        "t.k": "jauxH6Quw6C",
        v: "1",
        format: "json",
        action: "employer-ratings",
        ticker: ticker,
        useragent: "TMF",
        c: "us",
      };
      const {
        data: { statusCode, response },
      } = await axios.get(baseUrl, { params });

      return response;
    },
  };
};