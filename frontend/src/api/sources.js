import Axios from "axios";

export const getSources = () => {
    let channels = [];

    Axios.get(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`
    )
      .then((response) => {
        const data = response.data.sources;
        // console.log(data);
        for (let channel of data) {
          const domain = channel.url.split("w.")[1];
          channels.push({
            value: channel.id,
            label: channel.name,
            url: domain,
            color: "#00B8D9",
            isFixed: true,
          });
        }
      })
      .catch((error) => console.log(error));

    return channels
  };
