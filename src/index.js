import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { RAIZ, LOGIN, HOME, LOGOUT, NEWFOTO, USERS, URL_FOTO } from "./config/routes/paths";

import App from "./App";
import Login from "./components/views/Login";
import Home from "./components/views/Home";
import NewPhoto from "./components/views/NewPhoto";
import Account from "./components/views/Account";
import Logout from "./components/views/Logout";
import HomeAuth from "./components/routes/HomeAuth";
import LoginAuth from "./components/routes/LoginAuth";

import AuthContextProvider from "./contexts/AuthContext";
import Photo from "./components/views/Photo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Router>
      <React.StrictMode>
        <Routes>
          <Route path={HOME} element={
            <HomeAuth><App /></HomeAuth>}>
            <Route path={HOME} element={<Home />}></Route>
            <Route path={NEWFOTO} element={<NewPhoto />}></Route>
            <Route path={USERS} element={<Account/>}></Route>
            <Route path={URL_FOTO} element={<Photo/>}/>
          </Route>
          <Route path={LOGOUT} element={<Logout />}></Route>

          <Route
            path={LOGIN}
            element={<LoginAuth><Login /></LoginAuth>}
          ></Route>
          <Route
          path={RAIZ}
          element={<LoginAuth><Navigate to={LOGIN} /></LoginAuth>}
          ></Route>

        </Routes>
      </React.StrictMode>
    </Router>
  </AuthContextProvider>
);
