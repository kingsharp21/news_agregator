import axios from "axios";


export const fetchAllNews = () =>{

    let data = [];

    const newsApi = `https://newsapi.org/v2/everything?q=car&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`;
    const guardianApi = `https://content.guardianapis.com/search?q=car&format=json&page-size=50&from-date=2010-01-01&show-tags=contributor&show-fields=starRating,headline,thumbnail,standfirst,publication,short-url&order-by=relevance&api-key=test`;
    const nytApi = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${process.env.REACT_APP_NYT_API_KEY}`;

    const getnewsApi = axios.get(newsApi);
    const getguardianApi = axios.get(guardianApi);
    const getnytApi = axios.get(nytApi);

    axios.all([getguardianApi, getnytApi, getnewsApi]).then(
      axios.spread((...allData) =>{
        const guardianApiData = allData[0].data.response.results;
        const nytApiData = allData[1].data.response.docs;
        const newsApiData = allData[2].data.articles;

        console.log(nytApiData);

        guardianApiData.map((article)=>{
          const sheme = createSheme(
            article.fields.thumbnail,
            "The Guardian",
            article.fields.publication,
            article.fields.headline,
            article.webUrl,
            article.webPublicationDate,
            article.fields.standfirst
          );   
        //    setNews((news) => [...news, sheme]);
           data.append(sheme)          
        })


         nytApiData.map((article) => {
          const sheme = createSheme(
            `https://www.nytimes.com/${article.multimedia[1].url}`,
            "New York Times",
            article.source,
            article.headline.main,
            article.web_url,
            article.pub_date,
            article.abstract
          );
        //   setNews((news) => [...news, sheme]);
          data.append(sheme) 
        });


        newsApiData.map((article) => {
          
          const sheme = createSheme(article.urlToImage,
             "NewsApi",
             article.source.name,
             article.title,
             article.url,
             article.publishedAt,
             article.content
           );

        //    setNews((news) => [...news, sheme]);
           data.append(sheme) 
        });
          })
          )

    console.log('====================================');
    console.log(data);
    console.log('===================================='); 
    
  }

  // Function for structuring data
  const createSheme = (img, apiname, source, title, url, date, desc) => {
      //RemoveHTHL Tags Fuction
    const removeHTML = (input) => {
        let tmp = document.createElement("div");
        tmp.innerHTML = input;
        return tmp.textContent || tmp.innerText || "";
    };
    const sheme = {
      img: img,
      apiname: apiname,
      source: source,
      title: title,
      url: url,
      date: date,
      desc: removeHTML(desc),
    };
    return sheme
  };


