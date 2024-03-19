'use client';

import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { useMutation } from "react-query";

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

export default function Home() {
  const [sumNumbers, setSumNumbers] = useState<number[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    setSumNumbers([getRandomNumber(10), getRandomNumber(10)])
  }, []);

  const mutateLead: Record<string, any> = useMutation(async (data: Record<string, string>) => {
    const response = await fetch("/api/lead/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.name !== ''
      && formData.email !== ''
      && formData.tel !== ''
      && formData.sum !== ''
      && formData.age !== ''
      && formData.gender !== ''
      && Number(formData.sum) === (sumNumbers[0] + sumNumbers[1])
    ) {
      mutateLead.mutate(formData);
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <>
      {
        mutateLead.isLoading && <Loading />
      }

      {
        (mutateLead.isSuccess || mutateLead.isError) && <Toast content={mutateLead?.data?.content} error={mutateLead?.data?.error} />
      }

      <div >
        <div className="flex flex-col lg:flex-row justify-around items-center my-12 h-auto">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-white">
            <h2 className="p-2 text-center text-3xl font-bold">Desperte sua Criatividade: Descubra Novos Horizontes</h2>
            <h3 className="p-2 text-center text-xl font-extralight mb-12">Liberte sua imaginação e alcance o seu potencial máximo</h3>
            <p className="w-[90%] lg:w-[60ch] text-justify mb-8">Bem-vindo ao lugar onde a criatividade encontra possibilidades infinitas! Na nossa jornada para explorar e expandir os limites da imaginação, estamos aqui para guiá-lo rumo a novos horizontes de expressão e inovação.</p>
            <p className="w-[90%] lg:w-[60ch] text-justify">Você já se pegou sonhando acordado, visualizando mundos além da realidade cotidiana? Ou talvez tenha sentido aquela coceira na mente, ansioso para criar algo verdadeiramente único, mas não sabe por onde começar? Bem, você não está sozinho. Muitos de nós enfrentamos esses momentos de bloqueio criativo ou simplesmente desejamos dar vida às nossas ideias de forma mais vibrante e autêntica.</p>
            <img src="/photo.jpg" className="w-[60ch] my-8 rounded-xl hover:scale-105" />
          </div>
          <div className="hidden lg:block h-screen w-[1px] bg-gray-200"></div>
          <div className="bg-gray-200 px-8 py-4 rounded-xl flex flex-col justify-center items-start w-[90%] lg:w-1/3">
            <h3 className="font-bold self-center text-2xl">Preencha com seus dados</h3>
            <h4 className="font-extralight self-center">E desbloqueie seu presente!</h4>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center items-start w-full mt-8 gap-2">
              {
                mutateLead?.data && !mutateLead?.data?.error && (
                  <div className="bg-green-600 p-4 text-white rounded-xl mx-auto flex flex-col items-center justify-center my-4 shadow">
                    <h3 className="text-center font-bold">Obrigado! Clique no link abaixo para conferir sua recompensa:</h3>
                    <Link href={`/recompensa?id=${mutateLead.data.id}`} className="text-center uppercase underline my-2">E-book <BsLink45Deg className="inline"/> </Link>
                  </div>
                )
              }
              <label htmlFor="name" className="font-bold">Nome*</label>
              <input required type="text" id="name" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <label htmlFor="email" className="font-bold">Email*</label>
              <input required type="email" id="email" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <label htmlFor="tel" className="font-bold">Telefone*</label>
              <input required type="text" id="tel" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />

              <label htmlFor="age" className="font-bold">Idade*</label>
              <input required type="number" id="age" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, age: e.target.value })} />

              <label htmlFor="gender" className="font-bold">Gênero*</label>
              <select id="gender" className="w-full p-2 rounded-lg" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value="">Selecione uma opção</option>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
                <option value="o">Outro</option>
              </select>

              <label htmlFor="sum" className="font-bold">{sumNumbers[0]} + {sumNumbers[1]} = ?</label>
              <input required type="text" id="sum" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, sum: e.target.value })} />
              <button className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 font-bold rounded-xl my-8 w-full uppercase">Concluir</button>
              <p className="self-center font-extralight text-gray-700">Não se preocupe, seus dados são guardados com carinho.</p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
