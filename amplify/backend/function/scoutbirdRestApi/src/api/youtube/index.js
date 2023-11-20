"use strict";

const { default: axios } = require("axios");
const moment = require("moment")
const dayjs = require("dayjs");

const baseUrl = "https://h3wumwtddd.execute-api.us-east-1.amazonaws.com/v1/";

module.exports = async () => {
  return {
    search: async (ticker, date_from = undefined, date_to = undefined) => {
      const currentDate = dayjs();
      const from = date_from ? moment(date_from, "MM/DD/YYYY").format("YYYY-MM-DD") : currentDate.subtract(1, "month").format("YYYY-MM-DD")
      const to =  date_to ? moment(date_to, "MM/DD/YYYY").format("YYYY-MM-DD") : currentDate.format("YYYY-MM-DD")
      const path = "youtube-features";
      console.log("From: ", from)
      console.log("To: ", to)
      const {
        data: { statusCode, body },
      } = await axios.post(`${baseUrl}${path}`, {
        ticker,
        from,
        to
      });
      return body;
    },
  };
};
