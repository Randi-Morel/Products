import React, { useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext({
  isUser: false,
  isAuthLoading: false,
});

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log(user.uid)
      setIsUserAuth(true);
    } else {
      setIsUserAuth(false);
    }
    setLoadingUser(false);
  });

  const values = {
    isUser: isUserAuth,
    isAuthLoading: loadingUser,
  };

  return <Provider value={values}>{children}</Provider>;
};

AuthProvider.context = AuthContext;

export default AuthProvider;
