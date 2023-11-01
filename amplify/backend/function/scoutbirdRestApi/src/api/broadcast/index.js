const { default: axios } = require("axios");
const aws = require("aws-sdk");
const moment = require("moment")
const baseUrl = "https://api.gdeltproject.org/api/v2";
const TICKERS = require('../../ticker');

module.exports = async () => {
  return {
    tv: async (ticker) => {
      const path = `${baseUrl}/tv/tv?query="${TICKERS[ticker]}" (station:CNBC OR station:FBC OR station:BLOOMBERG OR station:CNN OR station:BLOOMBERG OR station:FOXNEWS)&mode=timelinevol&format=json&datanorm=perc&timelinesmooth=0&datacomb=sep&last24=yes&timezoom=no&STARTDATETIME=20230621070000&ENDDATETIME=${moment().format("yyyyMMDDHHmmss")}`
      const {
        status,data
      } =  await axios.get(path);
      return data
    }
  };
}