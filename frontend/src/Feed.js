import React ,{ useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loading from "./components/loading/Loading";
import LoadError from "./components/loaderror/LoadError";

// import { getSources } from "./api/NewsApi";
import Axios from "axios";

import Article from "./components/articles/Article";
import axios from "axios";





export default function Feed({ sourceList }) {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const [sources, setSources] = useState("");
  const [newsCount, setnewsCount] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState('');
  const [news,setNews] = useState([])


  const fetchAllNews = () =>{
    // const newsApi =`https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn&apiKey=${process.env.NEWSAPI_API_KEY}`;
    const newsApi =`https://newsapi.org/v2/everything?q=tesla&sources=bbc-news,cnn&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`;
    const guardianApi = `https://content.guardianapis.com/search?q=tesla,ghana&format=json&page-size=30&show-tags=contributor&show-fields=starRating,headline,thumbnail,standfirst,publication,short-url&order-by=relevance&api-key=test`;
    // const guardianApi = `https://content.guardianapis.com/search?q=tesla,ghana&format=json&page-size=50&from-date=2010-01-01&show-tags=contributor&show-fields=starRating,headline,thumbnail,standfirst,publication,short-url&order-by=relevance&api-key=test`;
    const nytApi = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tesla&page=2&api-key=${process.env.REACT_APP_NYT_API_KEY}`;

    const getnewsApi = axios.get(newsApi);
    const getguardianApi = axios.get(guardianApi);
    const getnytApi = axios.get(nytApi);

    axios.all([getguardianApi, getnytApi, getnewsApi]).then(
      axios.spread((...allData) =>{
        const guardianApiData = allData[0].data.response.results;
        const nytApiData = allData[1].data.response.docs;
        const newsApiData = allData[2].data.articles;

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
           setNews((news) => [...news, sheme]);           
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
          setNews((news) => [...news, sheme]);
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

           setNews((news) => [...news, sheme]);
        });
          })
          )
  }


  // Function for structuring data
  const createSheme = (img, apiname, source, title, url, date, desc) => {
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


  //RemoveHTHL Tags Fuction
  const removeHTML = (input) => {
    let tmp = document.createElement("div");
    tmp.innerHTML = input;
    return tmp.textContent || tmp.innerText || "";
  };
  

  const getNewsBySource = (keyword, source) => {
    Axios.get(
      `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&sources=${source}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`
    )
      .then((response) => {
        const data = response.data.articles;
        if (data.length == 0) {
          // setNews('null')
          setNews(false)
        }else{
        setNews([]);
        data.map((article) => {
          const sheme = createSheme(
            article.urlToImage,
            "NewsApi",
            article.source.name,
            article.title,
            article.url,
            article.publishedAt,
            article.content
          );
          setNews((news) => [...news, sheme]);
        });
      }
        // console.log(data);
      })
      .catch((error) => console.log(error));
  };


  const getDataWithoutSource = (keyword,period = '2022-01-01') => {
    Axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&begin_date=${period}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
    )
      .then((res) => {
        const data = res.data.response.docs;
        if (data.length == 0) {
          // setNews('null')
          setNews(false)
        }else{
          setNews([]);

        data.map((article) => {
          const sheme = createSheme(
            `https://www.nytimes.com/${article.multimedia[1].url}`,
            "New York Times",
            article.source,
            article.headline.main,
            article.web_url,
            article.pub_date,
            article.abstract
          );
          setNews((news) => [...news, sheme]);
        });

        }
        
      })
      .catch((error) => console.log(error));
  };



  const filterNews = ()=>{
    if (!sources == "") {
      setNews([]);
      getNewsBySource(search, sources);
    } else if(!search == ''|| !date == '') {
        setNews([]);
        if (date == '') {
          getDataWithoutSource(search)
        }else{
          getDataWithoutSource(search,date)
        }
    }else{
      setNews([]);
      fetchAllNews();
    }

  }

  useEffect(()=>{
    filterNews()
  },[search,sources,date])

  const updateSearchValue = (event) => {
    setSearch(event.target.value);
  };
  const updateDateValue = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    fetchAllNews();
    toast.success('Welcome Back', {
      position: toast.POSITION.TOP_RIGHT
  });
  }, []);

  useEffect(()=>{
    if (!news) {
      setnewsCount(0) ;
    }else{
      setnewsCount(news.length) ;
    }
  },[news.length])



  return (
    <>
      <div className="feed">
      <ToastContainer />
        <div className="container feed-container">
          <div className="feed-header">
            <h2>News</h2>
            <p>Read the news online and save the trees</p>
          </div>
          <div className="filter grid">
            <div className="filter-input search">
              <label>Search News</label>
              <input
                type="text"
                onChange={updateSearchValue}
                placeholder="Search news..."
              />
            </div>
            <div className="filter-input filter-by-authors ">
              <label>Select Start Date</label>
              <input
                type="date"
                onChange={updateDateValue}
                placeholder="Search news..."
              />
            </div>
            <div className="filter-input filter-by-Source ">
              <label>Filter by Source</label>
              <Select
                onChange={(newValue) => {
                  let sourceArr = "";
                  if (newValue.length > 0) {
                    newValue.forEach((source, index) => {
                      if (index == 0) {
                        sourceArr += `${source.value}`;
                      } else {
                        sourceArr += `,${source.value}`;
                      }

                      setSources(sourceArr);
                    });
                  } else {
                    setSources("");
                  }
                }}
                placeholder="Select or type to search source"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={sourceList}
              />
            </div>
          </div>
          <p className="total-feeds">
            {`Total ${newsCount} news found in this search criteria`}
          </p>
          <div className="feed-cards grid">
            {news.length == 0? <Loading/>:''}
            {Array.isArray(news)
              ? news.map((article, index) => {
                  return (
                    <Article
                      key={index}
                      img={article.img}
                      apiname={article.apiname}
                      source={article.source}
                      title={article.title}
                      url={article.url}
                      date={article.date}
                      desc={article.desc}
                    />
                  
                  );
                })
              : <LoadError/>}
          </div>
        </div>
      </div>
    </>
  );
}
