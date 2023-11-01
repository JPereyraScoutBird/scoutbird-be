/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNews = /* GraphQL */ `
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
export const listNews = /* GraphQL */ `
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
export const newsByTickerAndPublishedAt = /* GraphQL */ `
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
export const newsByTopicAiAndPublishedAt = /* GraphQL */ `
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
export const newsByUrl = /* GraphQL */ `
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
