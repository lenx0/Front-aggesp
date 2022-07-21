import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/home/Home";
import User from "../components/user/User";

export default (props) => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/users" element={<User />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
