"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useLoginContext } from "@/context/Login";

export default function Login() {
  const { logar, login, validateLogin } = useLoginContext();
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { user: "pedro", password: "123" } });

  if (login) {
    router.push("/home");
  }

  const handleLogin = async (e) => {
    const logado = await validateLogin(e.user, e.password);

    if (logado.error) {
      setError(logado.error);
      return;
    }

    logar(logado);
    router.push("/home");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Pedro Tech</h1>
            <p className="text-gray-500 mt-2">Bem-vindo de volta!</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Usuário
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("user")}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
                           focus:ring-2 focus:ring-green-900 focus:border-green-900
                           transition-all duration-200 outline-none text-black"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-900"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
                           focus:ring-2 focus:ring-green-900 focus:border-green-900
                           transition-all duration-200 outline-none text-black"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            {error && (
              <div>
                <span className="text-red-500">senha inválida</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-3 px-4 rounded-xl
                       hover:bg-green-900 focus:ring-4 focus:ring-green-200
                       transition-all duration-200 font-medium"
            >
              Entrar
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-500">Não tem uma conta? </span>
            <button
              className="text-green-700 hover:text-green-900 font-medium"
              onClick={() => router.push("/cadastro")}
            >
              Cadastre-se
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Pedro Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
