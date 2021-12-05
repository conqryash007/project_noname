import React, { useState } from "react";
import Users from "./users/pages/Users";
import Newplace from "./places/pages/Newplace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

import { Routes, Route } from "react-router-dom";

function App() {
  const [logged, setLogged] = useState(false);

  const login = () => {
    setLogged(true);
  };
  const logout = () => {
    setLogged(false);
  };

  let route;
  if (logged) {
    route = (
      <>
        <Route path="/" element={<Users />} exact></Route>
        <Route path="/places/new" element={<Newplace />} exact></Route>
        <Route path="/:userId/places" element={<UserPlaces />} exact></Route>
        <Route path="/places/:placeId" element={<UpdatePlace />} exact></Route>
        <Route path="/auth" element={<Users />} exact></Route>
      </>
    );
  } else {
    route = (
      <>
        <Route path="/" element={<Users />} exact></Route>
        <Route path="/auth" element={<Auth />} exact></Route>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: logged, logIn: login, logOut: logout }}
    >
      <Routes>{route}</Routes>
    </AuthContext.Provider>
  );
}

export default App;
