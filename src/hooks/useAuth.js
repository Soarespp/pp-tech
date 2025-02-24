import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeUserToken, generateUserToken } from "@/utils/generateKey";
import { useLoginContext } from "@/context/Login";

const pagesNotAuth = ["/", "/cadastro"];

export const useAuth = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const { userDados, usuarios, setUserDados, deslogar } = useLoginContext();

  const logout = () => {
    localStorage.removeItem("auth_token");
    router.push("/");
  };

  const validation = async () => {
    const pagina = window.location.pathname;

    const hasPageLogin = pagesNotAuth.includes(pagina);

    if (usuarios?.length < 1 && !hasPageLogin) {
      logout();
    }

    if (hasPageLogin && !token) {
      return;
    }
    const userValidation = decodeUserToken(token);

    if (!userValidation?.isValid) {
      logout();
    }

    if (!userDados) {
      const dadosUser = usuarios.find(
        (item) => item.user_name === userValidation.user
      );

      if (!dadosUser) {
        deslogar();
        return;
      }

      setUserDados(dadosUser);
    }
    router.push("/home");
  };

  useEffect(() => {
    validation();
  }, [router]);

  return { logout, validation, token };
};
