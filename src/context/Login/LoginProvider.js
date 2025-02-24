"use client";

import { useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";
import { decodeUserToken, generateUserToken } from "@/utils/generateKey";
import { userService } from "@/services";

export const LoginProvider = ({ children, directRoute }) => {
  const [userDados, setUserDados] = useState();
  const [login, setLogin] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const tokenUser = !!localStorage ? localStorage?.getItem("auth_token") : null;

  const atualizarDadosLogin = async () => {
    if (usuarios.length === 0) {
      const userNet = await userService.getSharedUsers();
      if (userNet) {
        setUsuarios(userNet);
      }
    }
  };

  const getDadosUsuarios = async () => {
    const usersAPI = await userService.getSharedUsers();

    setUsuarios(usersAPI);

    return usersAPI;
  };

  const validateLogin = async (user, pass) => {
    const hasUser = usuarios.find((item) => item.user_name === user);

    if (hasUser.password === pass) {
      return hasUser;
    } else {
      return { error: "login inválido" };
    }
  };

  const logar = (userLogin) => {
    localStorage.setItem(
      "auth_token",
      generateUserToken(userLogin.user_name, userLogin.password)
    );
    setLogin(true);

    setUserDados(userLogin);
    router.push("/home");
  };

  const deslogar = () => {
    localStorage.removeItem("auth_token");
    setLogin(false);
    setUserDados(undefined);
  };

  useEffect(() => {
    console.log("effet LOGIN provider");

    getDadosUsuarios();
  }, []);

  const valueProvider = {
    userDados,
    login,
    usuarios,
    hasToken: tokenUser,
    validateLogin,
    generateUserToken,
    decodeUserToken,
    logar,
    deslogar,
    atualizarDadosLogin,
    setUserDados,
    getDadosUsuarios,
  };

  return (
    <LoginContext.Provider value={valueProvider}>
      {children}
    </LoginContext.Provider>
  );
};
