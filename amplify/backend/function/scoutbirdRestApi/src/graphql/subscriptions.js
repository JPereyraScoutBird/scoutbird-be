"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUpdateNews = exports.onDeleteNews = exports.onCreateNews = void 0;
/* eslint-disable */
// this is an auto generated file. This will be overwritten

const onCreateNews = /* GraphQL */`
  subscription OnCreateNews($filter: ModelSubscriptionNewsFilterInput) {
    onCreateNews(filter: $filter) {
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
exports.onCreateNews = onCreateNews;
const onUpdateNews = /* GraphQL */`
  subscription OnUpdateNews($filter: ModelSubscriptionNewsFilterInput) {
    onUpdateNews(filter: $filter) {
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
exports.onUpdateNews = onUpdateNews;
const onDeleteNews = /* GraphQL */`
  subscription OnDeleteNews($filter: ModelSubscriptionNewsFilterInput) {
    onDeleteNews(filter: $filter) {
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
exports.onDeleteNews = onDeleteNews;