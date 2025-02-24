"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { userService } from "@/services";
import { useLoginContext } from "@/context/Login";

const tiposDocumentos = ["CPF", "RG", "CNPJ"];

const Perfil = () => {
  const { userDados, setUserDados } = useLoginContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...userDados,
      tipo_documento: userDados?.tipo_documento,
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data) => {
    try {
      const { id, ...formatData } = data;

      startTransition(async () => {
        const userUpdate = await userService.updateProfile({
          userId: id,
          updates: formatData,
        });

        startTransition(() => {
          setUserDados(userUpdate);
        });
      });

      router.push("/home");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/home"
              className="inline-flex items-center px-4 py-2 
                     bg-white rounded-lg shadow-sm 
                     hover:shadow-md transition-all duration-200
                     text-gray-700 hover:text-green-900
                     border border-gray-100 hover:border-green-900
                     group"
            >
              <FiArrowLeft
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                                  transition-transform duration-200"
              />
              <span className="font-medium">Voltar</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">
              Cadastro de Usuário
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Formulário */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome de Usuário
              </label>
              <input
                {...register("user_name", { required: "Campo obrigatório" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite seu nome de usuário"
              />
              {errors.user_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                {...register("password", { required: "Campo obrigatório" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite seu nome de usuário"
              />
              {errors.user_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                {...register("nome", { required: "Campo obrigatório" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite seu nome completo"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documento
              </label>
              <input
                {...register("documento", { required: "Campo obrigatório" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite seu documento"
              />
              {errors.documento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.documento.message}
                </p>
              )}
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                {...register("tipo_documento", {
                  required: "Campo obrigatório",
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
              >
                {tiposDocumentos.map((documento) => (
                  <option
                    defaultValue={userDados?.tipo_documento}
                    key={documento}
                  >
                    {documento}
                  </option>
                ))}
              </select>
              {errors.tipo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tipo.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite seu email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                {...register("dt_nascimento", {
                  required: "Campo obrigatório",
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
              />
              {errors.dt_nascimento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dt_nascimento.message}
                </p>
              )}
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100
                       rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 bg-green-900 text-white rounded-lg
                       hover:bg-green-800 transition-colors
                       flex items-center space-x-2 disabled:opacity-50"
              >
                <FiSave className="w-5 h-5" />
                <span>{isPending ? "Salvando..." : "Salvar"}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
