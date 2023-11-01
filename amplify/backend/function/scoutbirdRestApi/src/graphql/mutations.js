"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNews = exports.deleteNews = exports.createNews = void 0;
/* eslint-disable */
// this is an auto generated file. This will be overwritten

const createNews = /* GraphQL */`
mutation CreateNews(
  $input: CreateNewsInput!
  $condition: ModelNewsConditionInput
) {
  createNews(input: $input, condition: $condition) {
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
exports.createNews = createNews;
const updateNews = /* GraphQL */`
mutation UpdateNews(
  $input: UpdateNewsInput!
  $condition: ModelNewsConditionInput
) {
  updateNews(input: $input, condition: $condition) {
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
exports.updateNews = updateNews;
const deleteNews = /* GraphQL */`
mutation DeleteNews(
  $input: DeleteNewsInput!
  $condition: ModelNewsConditionInput
) {
  deleteNews(input: $input, condition: $condition) {
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
exports.deleteNews = deleteNews;