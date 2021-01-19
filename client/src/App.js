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

function App() {
  const [match, setMatch] = useState();
  const { selected, setSelected, partnerTemp } = usePartnerData();
  const { view, pageChange } = useMainView();
  const [user, setUser] = useState("");
  
  useEffect(() => {
    setUser(Math.floor(Math.random() * 10).toString()); // THIS ONE DANTE
    document.title = "Matcher";
  }, []);

  const foundMatch = function () {
    if (match) {
      return (
        <Alert variant={"success"}>Success! There was a match: {match}</Alert>
      );
    }
  };

  const resetMatch = function () {
    socket.emit("reset", "reset");
    console.log("match reset");
    setMatch();
  };

  socket.on("match", (match) => {
    console.log(`We have a match!! ${match}`);
    setMatch(match);
  });

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
              reset={resetMatch}
              user={user}
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
