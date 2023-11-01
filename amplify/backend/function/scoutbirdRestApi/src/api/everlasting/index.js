// "use strict";

const { createNews } = require("../../graphql/mutations");
const { listNews, newsByUrl } = require("../../graphql/queries");
const { appsyncRequest } = require("../../utils/appsyncRequest");

module.exports = async () => {
  return {
    getNewsByUrl: async (url) => {
      console.log("url", url)
      const {
        data: {
          newsByUrl: { items: newsObjects },
        },
        errors,
      } = await appsyncRequest({query: newsByUrl, variables: { url },});
      return newsObjects
    },
    addNews: async (articleData) => {
      console.log("article")
      const {
        data: { createNews: createdNews },
        errors,
      } = await appsyncRequest({
        query: createNews,
        variables: { input: articleData },
      });
      return createdNews;
    },
  };
};
