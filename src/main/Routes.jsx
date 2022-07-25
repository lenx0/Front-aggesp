import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import User from "../components/pages/user/User";
import Login from "../components/pages/login/Login"
import Vacancy from "../components/pages/vacancy/Vacancies"

export default (props) => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/users" element={<User />} />
    <Route path="/vacancies" element={<Vacancy />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
