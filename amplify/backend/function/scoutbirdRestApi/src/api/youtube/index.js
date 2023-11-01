"use strict";

const { default: axios } = require("axios");

const dayjs = require("dayjs");

const baseUrl = "https://h3wumwtddd.execute-api.us-east-1.amazonaws.com/v1/";

module.exports = async () => {
  return {
    search: async (ticker) => {
      const path = "youtube-features";
      const currentDate = dayjs();
      const {
        data: { statusCode, body },
      } = await axios.post(`${baseUrl}${path}`, {
        ticker,
        from: currentDate.subtract(1, "month").format("YYYY-MM-DD"),
        to: currentDate.format("YYYY-MM-DD"),
      });
      return body;
    },
  };
};
