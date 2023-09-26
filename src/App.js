import React from "react";
import { AuthContext } from "./context/Auth";
import Dashboard from "./layouts/dashboards";
import Authentication from "./layouts/authentication";
import Loading from "./components/custom/loading";

export default function App() {

  const authContext = React.useContext(AuthContext);

  if (authContext.isAuthLoading){
    return <Loading/>
  }

  return <> {authContext.isUser ? (<Dashboard />) : (<Authentication />)} </>;
}
