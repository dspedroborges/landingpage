import GoBack from "@/components/GoBack";
import MenuAdmin from "@/components/MenuAdmin";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react"

export default function Filtrar() {
    const [formData, setFormData] = useState<Record<string, string|number>>({});
    const router = useRouter();
    const session = useSession();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/admin/resultado?age=${formData.age}&gender=${formData.gender}`);
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
            <h2 className="text-center text-2xl font-bold my-4 text-white">Filtrar leads</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="bg-gray-200 p-2 my-8 w-1/2 mx-auto rounded-xl flex flex-col gap-4">
                <label htmlFor="age" className="font-bold">Idade*</label>
                <p className="text-xs text-gray-500">O sistema buscará pessoas de idade maior que a informada.</p>
                <input required type="text" id="age" className="p-2 rounded-lg w-full" onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} />
                <label htmlFor="gender" className="font-bold">Gênero*</label>
                <select required id="gender" className="w-full p-2 rounded-lg" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} >
                    <option value="">Selecione uma opção</option>
                    <option value="m">Masculino</option>
                    <option value="f">Feminino</option>
                    <option value="o">Outro</option>
                    <option value="n/a">n/a</option>
                </select>
                <button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 font-bold rounded-xl w-full uppercase">Buscar</button>
            </form>
            <button onClick={() => signOut()} className="fixed bottom-2 right-2 bg-red-600 text-white font-bold p-2 text-center hover:bg-red-700 rounded-xl">Sair</button>
        </>
    )
}