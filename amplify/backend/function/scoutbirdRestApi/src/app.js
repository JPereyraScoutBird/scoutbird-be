/* Amplify Params - DO NOT EDIT
	API_SCOUTBIRD_GRAPHQLAPIENDPOINTOUTPUT
	API_SCOUTBIRD_GRAPHQLAPIIDOUTPUT
	API_SCOUTBIRD_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["API_KEY_FMP","API_KEY_QUIVERQUANT","API_KEY_IEXCLOUD","API_KEY_LISTEN","API_KEY_SERPAPI","API_KEY_TIKTOK","API_KEY_GOOGLEAPI","API_KEY_OEPNAI","API_KEY_NEWSAPI","API_KEY_OPENAI"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const moment = require("moment")

// APIS
const stockNewsApi = require("./api/stockNews");
const SerpApiClient = require("./api/serpapi");
const YoutubeFeaturesClient = require("./api/youtube");
const GlassdoorClient = require('./api/glassdoor');
const GoogleClient = require('./api/google');
const OpenAiClient = require('./api/openai');
const EverlastingClient = require('./api/everlasting');
const fmp = require('./api/fmp');
const quiverquant = require('./api/quiverquant');
const iexcloud = require('./api/iexcloud');
const podcast = require('./api/podcast');
const broadcast = require('./api/broadcast');
const tiktok = require('./api/tiktok');
const cluster_news = require('./api/cluster_news');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/news/:ticker', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/news/:ticker/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/news/:ticker', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/news/:ticker/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/news/:ticker', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/news/:ticker/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/news/:ticker', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/news/:ticker/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

// MEDIA

app.get("/reddit/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const {start_date, end_date} = req?.query;
    const serpApiClient = await SerpApiClient();
    const redditResponse = await serpApiClient.redditApi(ticker, start_date, end_date);
    return res.status(200).json(redditResponse.sort((a, b) => (new Date(b.date) - new Date(a.date))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});


app.get("/linkedin/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const {start_date, end_date} = req?.query;
    const serpApiClient = await SerpApiClient();
    const linkedinResponse = await serpApiClient.linkedinApi(ticker, start_date, end_date);
    return res.status(200).json(linkedinResponse.sort((a, b) => (new Date(b.date) - new Date(a.date))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/substack/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const {start_date, end_date} = req?.query;
    const serpApiClient = await SerpApiClient();
    const substackResponse = await serpApiClient.substackApi(ticker, start_date, end_date);
    return res.status(200).json(substackResponse.sort((a, b) => (new Date(b.date) - new Date(a.date))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});


app.get("/tiktok/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const tiktokClient = await tiktok();
    const tiktokResponse = await tiktokClient.search(ticker);
    const tiktokResponse2 = tiktokResponse && tiktokResponse['media'] ? tiktokResponse['media'].map(x => ({
      "img": x['video']['cover']['url_list'][0],
      "create_time": moment(x['create_time']* 1000).format("DD/MM/YYYY"),
      "desc": x['desc'],
      "duration": x['video']['duration'] / 1000 ,
      "comment_count": x['statistics']['comment_count'],
      "download_count": x['statistics']['download_count'],
      "play_count": x['statistics']['play_count'],
      "share_count": x['statistics']['share_count'],
      "share_link": x['video']['play_addr']['url_list'][0]
  })) : []
    return res.status(200).json(tiktokResponse2);
  } catch (error) {
    return res.status(500).json({ error });
  }
});


// FMP API
app.get("/analyst/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.analystRating(ticker);
    return res.status(200).json(fmpResponse.sort((a, b) => (new Date(b.publishedDate) - new Date(a.publishedDate))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/insider-trading/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.insiderTrading(ticker);
    return res.status(200).json(fmpResponse.sort((a, b) => (new Date(b.filingDate) - new Date(a.filingDate))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/esg-data/:ticker", async function(req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.esgEnvSocialGovData(ticker);
    return res.status(200).json({table: fmpResponse, graph: fmpResponse.sort((a, b) => (new Date(b.date) - new Date(a.date)))});
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/stocknews/:ticker", async function(req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.stockNews(ticker);
    return res.status(200).json({table: fmpResponse})
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/senate-disclosure/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.senateDisclosure(ticker);
    return res.status(200).json(fmpResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})



app.get("/institutional-holder/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const fmpApiClient = await fmp();
    const fmpResponse = await fmpApiClient.institutionalSymbolOwner(ticker);
    const fmpResponse2 = await fmpApiClient.institutionalSymbolOwnerPercent(ticker);
    return res.status(200).json({graph: fmpResponse, table: fmpResponse2.sort((a, b) => (new Date(b.filingDate) - new Date(a.filingDate)))});
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// QUIVERQUANT API
app.get("/gov-contract/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const quiverQuantApiClient = await quiverquant();
    const quiverResponse = await quiverQuantApiClient.govContract(ticker);
    return res.status(200).json(quiverResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})


app.get("/lobbying/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const quiverQuantApiClient = await quiverquant();
    const quiverResponse = await quiverQuantApiClient.lobbying(ticker);
    return res.status(200).json(quiverResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/patents/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const quiverQuantApiClient = await quiverquant();
    const {start_date=undefined, end_date=undefined} = req?.query;
    const quiverResponse = await quiverQuantApiClient.patents(ticker, start_date, end_date);
    return res.status(200).json(quiverResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/twitter/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const quiverQuantApiClient = await quiverquant();
    const quiverResponse = await quiverQuantApiClient.twitter(ticker);
    return res.status(200).json(quiverResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})


app.get("/wikipedia/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const quiverQuantApiClient = await quiverquant();
    const quiverResponse = await quiverQuantApiClient.wikipedia(ticker);
    return res.status(200).json(quiverResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/ir/:ticker", async function (req, res) {
  try {
      const ticker = req?.params?.ticker;
      const serpApiClient = await SerpApiClient();
      const substackResponse = await serpApiClient.IRApi(ticker);
      return res.status(200).json(substackResponse[0]['link']);
    } catch (error) {
      return res.status(500).json({ error });
  }
});



app.get("/dashboard/summary/:ticker", async function(req, res) {
  try {
    const ticker = req?.params?.ticker;
    const news_clustering = await cluster_news(ticker);
    const response = await news_clustering.search(ticker);
    const serpApiClient = await SerpApiClient();
    const podcastApiClient = await podcast();
    // const tags = response.map(x => x['cluster_tags'].map(y => `"${y.toUpperCase()}"`).filter(x => x !== '"INC."' && x !== '"NASDAQ"' && x !== `"${ticker.toUpperCase()}"`).join(" OR "))
    // console.log("tags: ", tags.filter(x => x != 'INC.' || x != ticker.toUpperCase()))

    let res_list = []
    for(item of response ) {
      // console.log(item)
      const tags = item['cluster_tags'].map(y => `"${y.toUpperCase()}"`).filter(x => x !== '"INC."' && x !== '"NASDAQ"' && x !== `"${ticker.toUpperCase()}"`).join(" OR ")
      // console.log(response)
      const redditReponse = await serpApiClient.socialCustomApi(ticker, 'www.reddit.com', tags)
      const linkedinResponse = await serpApiClient.socialCustomApi(ticker, 'www.linkedin.com', tags)
      const podcastResponse = await podcastApiClient.searchCustom(ticker, tags)
      // console.log("items: ", item['news_titles'].map((x, index) => ({"title": x, "link": item['news_urls'][index], "source": "site", "date": item["news_pub_dates"][index]})))
      res_list.push({
        ...item,
        redditReponse: {
          list: redditReponse,
          count: redditReponse.length
        },
        linkedinResponse: {
          list: linkedinResponse,
          count: linkedinResponse.length
        },
        podcastResponse: {
          list: podcastResponse.results,
          count: podcastResponse.count
        },
        newsResponse: {
          list: item && item['news_titles'] ? item['news_titles'].map((x, index) => ({"title": x, "link": item['news_urls'][index], "source": "site", "date": item["news_pub_dates"][index]})) : [],
          count: item['news_titles'].length
        }
      })
    }
    // console.log("res_list: ", res_list)
    // console.log("reddit", res_list[0]['linkedinResponse'])
    return  res.status(200).json(res_list);
  } catch (error) {
    return res.status(500).json({ error });
}
})

const getSumValuesFromDate = (output, key, value, format='YYYYMM') => {
  const sum = output.reduce((acc, cur)=> {
    let found = acc.find(val => moment(val[key]).format(format) == moment(cur[key]).format(format))
    if(found){
      found['count']+=1
      found[value]+=Number(cur[value])
    }
    else{
        acc.push({[key]: moment(cur[key]).format(format), [value]: Number(cur[value]), count: cur['count'] || 1})
    }
    return acc
  }, [])
  return sum
}

app.get("/company-outlook/:ticker", async function (req, res) {
  try {
      const ticker = req?.params?.ticker;
      const fmpClient = await fmp();
      const fmpClientResponse = await fmpClient.companyOutlook(ticker);
      return res.status(200).json(fmpClientResponse);
    } catch (error) {
      return res.status(500).json({ error });
  }
});

app.get("/summary/:ticker", async function (req, res) {
  const ticker = req?.params?.ticker;
  const glassdoorClient = await GlassdoorClient();
  const glassdoorClientResponse = await glassdoorClient.search(ticker);
  const quiverQuantApiClient = await quiverquant();

  // const broadcastApiClient = await broadcast();
  // const broadcastResponse = await broadcastApiClient.tv(ticker);
  // const tiktokClient = await tiktok();
  // const tiktokResponse = await tiktokClient.search(ticker);
  // const serpApiClient = await SerpApiClient();
  // const linkedinResponse = await serpApiClient.linkedinApi(ticker);
  // const redditReponse = await serpApiClient.redditApi(ticker);
  const fmpApiClient = await fmp();
  const analystResponse = await fmpApiClient.analystRating(ticker)
  const insiderResponse = await fmpApiClient.insiderTrading(ticker)
  const quiverResponse = await quiverQuantApiClient.patents(ticker);



  const insiderResponse2 = insiderResponse.sort((a, b) => (new Date(b.filingDate) - new Date(a.filingDate)))
  const analystResponse2 = analystResponse.sort((a, b) => (new Date(b.publishedDate) - new Date(a.publishedDate)));
  const insiderResponse3 = insiderResponse2.map(x => ({...x, 'value': x['securitiesTransacted'] * x['price']}))

  const esg = await fmpApiClient.esgEnvSocialGovData(ticker)
  const esgRes2 = esg.sort((a, b) => (new Date(b.date) - new Date(a.date)))
  const instituionalHolders = await fmpApiClient.institutionalSymbolOwner(ticker);
  const iexCloudtApiClient = await iexcloud();
  const iexCloudResponse = await iexCloudtApiClient.peers(ticker);

  // const esgResponse = await fmpApiClient.esgEnvSocialGovData(ticker);
  const environment = []
  const governance = []
  const social = []
  const esgList = []
  const glassdoorList = []
  esgRes2.map(x => {
    esgList.push(x['ESGScore'])
    environment.push(x['environmentalScore'])
    governance.push(x['governanceScore'])
    social.push(x['socialScore'])
  })
  glassdoorClientResponse['weeklyHistogram'].map((x, index) => {
    glassdoorList[index] = {'interval': x['interval']}
    x['individualRatings'].map(y => {
      glassdoorList[index][y['category']] = y['rating']
    })
  })

  // const stockResponse = await fmpApiClient.stockNews(ticker);
  // const stockResponse1 = await fmpApiClient.stockNews(iexCloudResponse[0]);
  // const stockResponse2 = await fmpApiClient.stockNews(iexCloudResponse[1]);
  // const stockResponse3 = await fmpApiClient.stockNews(iexCloudResponse[2]);
  // const stockResponse4 = await fmpApiClient.stockNews(iexCloudResponse[3]);

  return res.status(200).json({
    analyst: {
      target: getSumValuesFromDate(analystResponse2,'publishedDate', 'priceTarget', 'YYYYMM'),
      posted: getSumValuesFromDate(analystResponse2, 'publishedDate', 'priceWhenPosted', 'YYYYMM')
    },
    esg: {
      environment: environment,
      social: social,
      governance: governance,
      esgScore: esgList,
    },
    institutionalHolder: instituionalHolders.map(x => x.investorsHolding),
    insiderTrading: {
      securityTransacted: getSumValuesFromDate(insiderResponse2, 'filingDate', 'securitiesTransacted', 'YYYYMM'),
      valueTransacted: getSumValuesFromDate(insiderResponse3, 'filingDate', 'value', 'YYYYMM'),
    },
    glassdoor: glassdoorList,
    patents: getSumValuesFromDate(quiverResponse, 'Date', 'Claims', 'YYYYMM')
    // news: stockResponse,
    // competitorNews: {
    //   [iexCloudResponse[0]]: stockResponse1,
    //   [iexCloudResponse[1]]: stockResponse2,
    //   [iexCloudResponse[2]]: stockResponse3,
    //   [iexCloudResponse[3]]: stockResponse4,
    // }
  });
})


// IEX CLOUD
app.get("/peers/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const iexCloudtApiClient = await iexcloud();
    const iexCloudResponse = await iexCloudtApiClient.peers(ticker);
    return res.status(200).json(iexCloudResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
})


app.get("/podcast/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const podcastApiClient = await podcast();
    const {start_date=undefined, end_date=undefined} = req?.query;
    let podcastResponse = ''
    if (start_date && end_date) {
      podcastResponse = await podcastApiClient.searchDate(ticker, start_date, end_date);
    } else {
      podcastResponse = await podcastApiClient.search(ticker);
    }
    if (podcastResponse && podcastResponse.results) {
      return res.status(200).json(podcastResponse.results.map(x => ({...x, pub_date_ms: moment(x.pub_date_ms).format('YYYYMMDD')})));
    }
    return res.status(200).json(podcastResponse)

  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/broadcast/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const broadcastApiClient = await broadcast();
    const broadcastResponse = await broadcastApiClient.tv(ticker);
    let graphLabel = []
    let dataobject = []
    broadcastResponse.timeline.map((x, index) => 
      x.data.map((y) => {
        dataobject.push({
        date: moment(y.date).format('YYYYMMDD'),
        ticker: ticker,
        channel: x.series,
        coverage: y.value
      })
      if(index == 0) {
        graphLabel.push(moment(y.date).format('YYYYMMDD'))
      }
    })
    )
    return res.status(200).json({query_details: broadcastResponse.query_details, timeline: broadcastResponse.timeline, graphLabel: graphLabel, table: dataobject.sort((a, b) => parseInt(b.date) - parseInt(a.date))});
  } catch (error) {
    return res.status(500).json({ error });
  }
})

app.get("/youtube/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const {start_date=undefined, end_date=undefined} = req?.query;
    console.log("start", start_date)
    const youtubeFeaturesClient = await YoutubeFeaturesClient();
    const youtubeFeaturesResponse = await youtubeFeaturesClient.search(ticker, start_date, end_date);
    return res.status(200).json(youtubeFeaturesResponse.sort((a,b) => (new Date(b.pub_date) - new Date(a.pub_date))));
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/glassdoor/:ticker", async function (req, res) {
  try {
    const ticker = req?.params?.ticker;
    const glassdoorClient = await GlassdoorClient();
    const glassdoorClientResponse = await glassdoorClient.search(ticker);
    return res.status(200).json(glassdoorClientResponse);
  } catch (error) {
    return res.status(500).json({ error });
  }
});


const getArticles = async (companyName, page, stockNewsApiClient) => {
  if(companyName == 'MACRO') {
    return await stockNewsApiClient.macroeconomic(page);
  } else {
    return await stockNewsApiClient.everything(companyName, page);
  }
}


app.post("/newsdata", async function (req, res) {
  const stocksList = req?.body;
  console.log({ body: req?.body });
  let count_new_article = 0
  let count_old_article = 0
  let count_google_call = 0
  const stock_list_count = {}

  try {
    const stockNewsApiClient = await stockNewsApi();
    const googleClient = await GoogleClient();
    const openAiClient = await OpenAiClient();
    const everlastingClient = await EverlastingClient();

    // const googleClient = await GoogleClient()

    const concurrentCompanyCalls = stocksList.map(
      async ({ companyName, companySymbol }) => {

        let articles2 = []
        const { status, totalResults, articles } = await getArticles(companyName, 1, stockNewsApiClient)
        const pages = Math.ceil(totalResults / 100)
        // console.log(pages)
        // console.log(status)
        // console.log(totalResults)
        // console.log("First: ", articles.length)
        for(x=2; x < pages; x++) {
          articles2 = await getArticles(companyName, x, stockNewsApiClient)
          
          articles.push(...(articles2['articles']))
        }
        // console.log("Last:", articles.length)

        const concurrentCalls = articles.map(
          async ({
            author,
            description,
            content = "",
            title,
            url,
            urlToImage,
            source: { name: sourceName },
            publishedAt,
          }) => {
            if(content && title) {
            const contentLengthPatternMatch = content.match(/\[.*?\]/g);

            const articleData = {
              author,
              description,
              content: content.replace(/[^a-zA-Z ]/g, ""),
              title,
              company: companyName,
              ticker: companySymbol,
              contentLength: contentLengthPatternMatch
                ? parseInt(
                    contentLengthPatternMatch[0]
                      .replace("[", "")
                      .replace("]", "")
                      .replace(" chars", "")
                  )
                : 0,
              url,
              imageUrl: urlToImage,
              source: sourceName,
              sentiment: 0,
              topicAiRelevant: false,
              topicAi: "N/A",
              topicAiScore: 0,
              publishedAt,
            };
            
            // console.log(url)
            // console.log("title: ", title)
            try {
              const newsDataExist = await everlastingClient.getNewsByUrl(url);
              // console.log({ newsDataExist });
              if (newsDataExist?.length) {
                // continue
                console.log("will not create", newsDataExist[0].url);
                count_old_article = count_old_article + 1
              } else {

                const {
                  data: {
                    choices: [{ text: openAiTitle }],
                  },
                } = await openAiClient.generateTitle(title);

                if (openAiTitle) {
                  // .trim() to remove all whitespace like "\n\n"
                  articleData.titleAi = openAiTitle.trim();
                }

                const [
                  {
                    sentences,
                    documentSentiment: { magnitude, score },
                  },
                ] = await googleClient.sentimentAnalysis(content);
                if (score) {
                  articleData.score = score;
                }

                const [{ categories }] = await googleClient.classifyText(content);
                count_google_call = count_google_call + 1

                const [relevantCategory] = categories.filter((category) => {
                  const { name, confidence } = category;
                  // console.log("category", category)
                  if (name.toLowerCase().includes("stock") || name.toLowerCase().includes("company") || name.toLowerCase().includes("financial")) {
                    if (confidence >= 0.5) {
                      return true;
                    }
                  }
                  return false;
                });

                if (relevantCategory) {
                  articleData.topicAiRelevant = true;
                  articleData.topicAi = relevantCategory?.name;
                  articleData.topicAiScore = relevantCategory?.confidence;
                }

                const newsCreated = await everlastingClient.addNews(articleData);
                count_new_article = count_new_article + 1
                // console.log({ newsCreated });
              }
            }
            catch (error) {
              console.log("error", JSON.stringify(error))
            }
            }
          }
        );
          
        await Promise.all(concurrentCalls);
        stock_list_count[companySymbol] = {
          count_new_article,
          count_old_article,
          count_google_call,
        }
      }
    );
    
    console.log("count_new_article: ", count_new_article)
    console.log("count_old_article: ", count_old_article)

    await Promise.all(concurrentCompanyCalls);
    console.log("stock_list: ", stock_list_count)

    return res.json({
      statusCode: 200,
      body: JSON.stringify({"stock_list_count": stock_list_count}),
    });
  } catch (error) {
    console.error({ error });
  }

  return { statusCode: 200, body: JSON.stringify("success") };
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
