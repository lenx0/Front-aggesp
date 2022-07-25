import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import React from "react";

import { BrowserRouter } from "react-router-dom";

import Logo from "../components/template/logo/Logo";
import Nav from "../components/template/nav/Nav";
import Routes from "./Routes";
import Footer from "../components/template/footer/Footer";


export default (props) => (
  <BrowserRouter>
  
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </BrowserRouter>
);
