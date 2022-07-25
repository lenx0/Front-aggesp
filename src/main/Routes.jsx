import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import User from "../components/user/User";
import Login from "../components/home/Login"

export default (props) => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/users" element={<User />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
