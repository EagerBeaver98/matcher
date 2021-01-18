import React, { useState, useEffect } from "react";
import "./App.scss";
import "./bootstrap/vendor/bootstrap/css/bootstrap.css";
import io from "socket.io-client";
import "./App.scss";
import "./bootstrap/vendor/bootstrap/css/bootstrap.css";
import axios from "axios";
import Partner from "./components/Partner";
import PartnerList from "./components/PartnerList";
import usePartnerData from "./hooks/partnerData";
import Matcher from "./components/Matcher";
import Nav from "./components/Nav";
import useMainView from "./hooks/mainView";
import View from "./components/View";
import { Alert } from "react-bootstrap";

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

const paddingRestaurant = {
  name: "null",
  image_url:
    "https://s3-media3.fl.yelpcdn.com/bphoto/BhSkksnrQr2XEriwIIsacQ/o.jpg",
  phone: "604-669-7769",
  address: "1719 Robson Street",
  city: "Vancouver",
  rating: 4,
  price: "$$",
};

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [match, setMatch] = useState();

  useEffect(() => {
    const getUserRestaurants = async function () {
      socket.emit("restaurant request", "user");
      await socket.on("restaurant response", (response) => {
        response.unshift(paddingRestaurant);
        setRestaurants(response);
      });
    };
    getUserRestaurants();
    document.title = "Matcher";
  }, []);

  const { selected, setSelected, partnerTemp } = usePartnerData();

  const { view, pageChange } = useMainView();

  const resetMatch = function () {
    socket.emit("reset", "reset");
    console.log("match reset");
  };

  const changeCategory = function (category) {
    socket.emit("new category", category);
  };

  socket.on("connection", (response) => {
    console.log("connected");
  });

  socket.on("match", (match) => {
    console.log(`We have a match!! ${match}`);
    setMatch(match);
  });

  socket.on("query response", (response) => {
    console.log("setting new restaurants...");
    response.unshift(paddingRestaurant);
    setRestaurants(response);
  });

  const foundMatch = function () {
    if (match) {
      return (
        <Alert variant={"success"}>Success! There was a match: {match}</Alert>
      );
    }
  };

  return (
    <body>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            Matcher
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <Nav view={view} pageChange={pageChange} />
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {partnerTemp.map((partner) => {
              if (partner.id === selected) {
                return <Partner name={partner.name} email={partner.email} />;
              }
            })}
            <View
              foundMatch={foundMatch}
              view={view}
              select={setSelected}
              selected={selected}
              partners={partnerTemp}
              changeCat={changeCategory}
              reset={resetMatch}
              restaurants={restaurants}
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;