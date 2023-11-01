"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newsByTopicAiAndPublishedAt = exports.newsByTickerAndPublishedAt = exports.newsByUrl = exports.listNews = exports.getNews = void 0;
/* eslint-disable */
// this is an auto generated file. This will be overwritten


const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      company
      author
      contentLength
      content
      description
      imageUrl
      sentiment
      source
      ticker
      title
      titleAi
      topicAi
      topicAiRelevant
      topicAiScore
      score
      url
      publishedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
exports.getNews = getNews;
const listNews = /* GraphQL */ `
  query ListNews(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        company
        author
        contentLength
        content
        description
        imageUrl
        sentiment
        source
        ticker
        title
        titleAi
        topicAi
        topicAiRelevant
        topicAiScore
        score
        url
        publishedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
exports.listNews = listNews;
const newsByTickerAndPublishedAt = /* GraphQL */ `
  query NewsByTickerAndPublishedAt(
    $ticker: String!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsByTickerAndPublishedAt(
      ticker: $ticker
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        company
        author
        contentLength
        content
        description
        imageUrl
        sentiment
        source
        ticker
        title
        titleAi
        topicAi
        topicAiRelevant
        topicAiScore
        score
        url
        publishedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
exports.newsByTickerAndPublishedAt = newsByTickerAndPublishedAt;
const newsByTopicAiAndPublishedAt = /* GraphQL */ `
  query NewsByTopicAiAndPublishedAt(
    $topicAi: String!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsByTopicAiAndPublishedAt(
      topicAi: $topicAi
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        company
        author
        contentLength
        content
        description
        imageUrl
        sentiment
        source
        ticker
        title
        titleAi
        topicAi
        topicAiRelevant
        topicAiScore
        score
        url
        publishedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
exports.newsByTopicAiAndPublishedAt = newsByTopicAiAndPublishedAt;

const newsByUrl = /* GraphQL */ `
  query NewsByUrl(
    $url: String!
    $sortDirection: ModelSortDirection
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    newsByUrl(
      url: $url
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        company
        author
        contentLength
        content
        description
        imageUrl
        sentiment
        source
        ticker
        title
        titleAi
        topicAi
        topicAiRelevant
        topicAiScore
        score
        url
        publishedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
exports.newsByUrl = newsByUrl;
