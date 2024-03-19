import GoBack from "@/components/GoBack";
import MenuAdmin from "@/components/MenuAdmin";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react"
import { BsCheck2Circle } from "react-icons/bs";
import { useQuery } from "react-query";

export default function Filtrar() {
    const router = useRouter();
    const session = useSession();
    const { age, gender } = router.query;
    const [isCopied, setIsCopied] = useState(false);
    const leads = useQuery([`/api/lead/findByTags?age=${age}&gender=${gender}`], async () => {
        const response = await fetch(`/api/lead/findByTags?age=${age}&gender=${gender}`)
        return response.json()
    }, {
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });

    const getAllSomething = (something: string) => {
        let result = [];
        if (leads?.data?.length > 0) {
            const data = leads.data;
            for (let i = 0; i < data.length; i++) {
                let current = data[i];
                if (current[something]) {
                    result.push(current[something]);
                }
            }
        }

        return result.join(",");
    }

    const addToClipBoard = (content: string) => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    }

    if (session.status !== "authenticated") {
        return (
            <div className="text-white my-4">
                <h2 className="text-2xl font-bold text-center">Sem permissão.</h2>
                <Link href="/login" className="block my-4 text-center text-blue-300 hover:underline">Clique aqui para autenticar-se.</Link>
            </div>
        )
    }

    return (
        <>
            <MenuAdmin/>
            <h2 className="text-center text-2xl font-bold my-4 text-white">Resultado</h2>
            {
                leads?.data?.length > 0 ? (
                    <>
                        <div className="flex justify-around items-center bg-gray-600 text-white px-4 py-2 font-bold">
                            <div className="text-center">Emails</div>
                            <div className="text-center">Telefones</div>
                        </div>
                        {
                            leads?.data?.map((lead: typeof leads.data[0], i: number) => {
                                return (
                                    <div key={i} className="flex justify-around items-center p-4 bg-white">
                                        <div>{lead.email}</div>
                                        <div>{lead.tel}</div>
                                    </div>
                                )
                            })
                        }
                        <div className="flex justify-around items-center">
                            <button onClick={() => addToClipBoard(getAllSomething("email"))} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 font-bold w-full uppercase">Copiar emails</button>
                            <button onClick={() => addToClipBoard(getAllSomething("tel"))} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 font-bold w-full uppercase">Copiar telefones</button>
                        </div>

                        {
                            isCopied &&
                            <div className="my-4 p-2 text-center rounded-xl bg-green-500 text-white animate-bounce w-[90%] lg:w-1/2 mx-auto">
                                <BsCheck2Circle className="inline text-2xl mr-2" />
                                Copiado!
                            </div>
                        }
                    </>
                ) : (
                    <div className="p-4 text-center text-red-950">Nenhum resultado encontrado.</div>
                )
            }
            <button onClick={() => signOut()} className="fixed bottom-2 right-2 bg-red-600 text-white font-bold p-2 text-center hover:bg-red-700 rounded-xl">Sair</button>
        </>
    )
}