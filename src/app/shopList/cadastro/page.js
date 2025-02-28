"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import { FiArrowLeft, FiSave } from "react-icons/fi";

import { ImageUpload } from "@/components";
import { useMercadoContext } from "@/context/mercado";
import { Suspense, useEffect, useState, useTransition } from "react";
import { produtoService } from "@/services/produtos";
import { categorias } from "@/utils/constantes";

const CadastroProdutoApp = () => {
  const [isPending, startTransition] = useTransition();
  const { getDadosProdutos } = useMercadoContext();
  const searchParams = useSearchParams();
  const idParams = searchParams.get("id");
  const router = useRouter();
  const [produtoDefault, setProtudoDefault] = useState(undefined);

  const { handleSubmit, register, control, trigger, reset } = useForm();

  useEffect(() => {
    const getDadosprod = async () => {
      const defaultProd = await produtoService.getProduto(idParams);

      if (!defaultProd) {
        setProtudoDefault(undefined);
        return;
      }

      setProtudoDefault(defaultProd);
      reset({
        name: defaultProd.name,
        categoria:
          categorias.find((item) => item.id === defaultProd.categoria) ??
          undefined,
        img: defaultProd.img,
      });
    };

    getDadosprod();
  }, []);

  const clickSubmite = (data) => {
    startTransition(async () => {
      const insertProps = {
        name: data.name,
        // img: data.img,
        img: data.categoria?.img,
        id_categoria: data.categoria?.id,
      };

      if (idParams) {
        await produtoService.updateProduto(idParams, insertProps);
      } else {
        await produtoService.addProduto(insertProps);
      }

      getDadosProdutos();

      router.push("/shopList");
    });
  };

  const clickDelete = () => {
    startTransition(async () => {
      await produtoService.deleteProduto(produtoDefault);

      getDadosProdutos();
      router.push("/shopList");
    });
  };

  const handleImageUpload = (file) => {
    // Implementar upload
    // const formData = new FormData();
    // formData.append("image", file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push("/shopList")}
              className="inline-flex items-center px-4 py-2 
                     bg-white rounded-lg shadow-sm 
                     hover:shadow-md transition-all duration-200
                     text-gray-700 hover:text-green-600
                     border border-gray-100 hover:border-green-100
                     group"
            >
              <FiArrowLeft
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                                  transition-transform duration-200"
              />
              <span className="font-medium">Voltar</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Cadastro de Produto
            </h1>
            <div className="w-24" /> {/* Espaço para balanceamento */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit(clickSubmite)} className="space-y-6">
            {/* Nome do Produto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-green-900 focus:border-green-900
                       transition-all duration-200 outline-none"
                placeholder="Digite o nome do produto"
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <Controller
                control={control}
                name="categoria"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    options={categorias}
                    className="w-full"
                    onChange={onChange}
                    placeholder="Selecione uma categoria"
                    required
                    inputRef={ref}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: "#e5e7eb",
                        "&:hover": {
                          borderColor: "#064e3b", // green-900
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#064e3b"
                          : base.backgroundColor,
                        "&:hover": {
                          backgroundColor: "#065f46", // green-800
                        },
                      }),
                    }}
                  />
                )}
              />
            </div>

            {/* Upload de Imagem */}

            {/* <div className="opacity-50 pointer-events-none">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem do Produto
              </label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                // currentImage={produto.img}
              />
            </div> */}

            {/* Botões de Ação */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              {idParams && (
                <div className="flex-1">
                  <button
                    type="button"
                    className="px-4 py-2 text-red-700 
                       rounded-lg transition-colorstext-red-500 hover:bg-red-300"
                    onClick={() => clickDelete()}
                  >
                    Exluir
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => router.push("/shopList")}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100
                       rounded-lg transition-colors"
                disabled={isPending}
              >
                Cancelar
              </button>
              <button
                disabled={isPending}
                type="submit"
                className="px-6 py-2 bg-green-900 text-white rounded-lg
                       hover:bg-green-800 transition-colors
                       flex items-center space-x-2"
              >
                <FiSave className="w-5 h-5" />
                <span>Salvar</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default function CadastroProduto() {
  return (
    <Suspense>
      <CadastroProdutoApp />
    </Suspense>
  );
}

// export default CadastroProduto;
