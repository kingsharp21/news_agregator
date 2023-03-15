import React, { useState, useEffect } from "react";
import Customise from "./components/customise/Customise";
import Navbar from "./components/navbar/Navbar";
import Feed from "./Feed";
import Login from "./Login";
import Signup from "./Signup";
import Loading from "./components/loading/Loading";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";


import Axios from "axios";

function App({sourceList}) {

  // const[sources,setSources] = useState('')
  // const getSources = () => {
  //   let channels = [];

  //   Axios.get(
  //     "https://newsapi.org/v2/top-headlines/sources?apiKey=aa4ec278df434a03911b76eb1b05139a"
  //   )
  //     .then((response) => {
  //       const data = response.data.sources;
  //       console.log(data);
  //       for (let channel of data) {
  //         const domain = channel.url.split("w.")[1];
  //         channels.push({
  //           value: channel.id,
  //           label: channel.name,
  //           url: domain,
  //           color: "#00B8D9",
  //           isFixed: true,
  //         });
  //       }
  //     })
  //     .catch((error) => console.log(error));

  //   setSources(channels);
  // };

  // useEffect(()=>{
  //   getSources()
  // },[])

  return (
    <>
      <Navbar />
      <Feed sourceList={sourceList} />
    </>
  );
}

export default App;
