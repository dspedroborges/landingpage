import { useRouter } from "next/router";
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import GoBack from "@/components/GoBack";
import MenuAdmin from "@/components/MenuAdmin";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Filtrar() {
    const session = useSession();

    const stats = useQuery(["/api/lead/stats"], async () => {
        const response = await fetch("/api/lead/stats")
        return response.json()
    }, {
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });

    const createData = (array: Record<string, string | number>[]) => {
        if (!array) return {
            labels: ["Carregando"],
            datasets: [
                {
                    label: 'Carregando',
                    data: [1],
                    backgroundColor: ["green"],
                    borderColor: ["green"],
                    borderWidth: 1,
                },
            ],
        };

        let dataArrays: Record<string, any> = {
            data: [],
            genders: [],
            colors: [],
        };
        const colors = ["dodgerblue", "pink", "lightyellow", "dodgerblue", "pink", "purple"];
        for (let i = 0; i < array.length; i++) {
            dataArrays.data.push(array[i].proportion);
            dataArrays.genders.push(translateGender(String(array[i].gender)));
            dataArrays.colors.push(colors[i]);
        }

        return {
            labels: dataArrays.genders,
            datasets: [
                {
                    label: '# de gênero',
                    data: dataArrays.data,
                    backgroundColor: dataArrays.colors,
                    borderColor: dataArrays.colors,
                    borderWidth: 1,
                },
            ],
        };
    }

    const translateGender = (gender: string) => {
        switch (gender) {
            case "m":
                return "Masculino";
            case "f":
                return "Feminino";
            case "o":
                return "Outro";
            default:
                return gender;
        }
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
        <div className="text-white">
            <MenuAdmin />
            <h2 className="text-center text-2xl font-bold my-4">Estatística dos leads</h2>
            <p className="text-center my-4"><span className="font-bold">Idade média</span>: {stats?.data?.averageAge} </p>
            <div className="flex justify-center items-center">
                <div className="w-1/5">
                    <Pie data={createData(stats?.data?.proportionByGender)} />
                </div>
            </div>
            <button onClick={() => signOut()} className="fixed bottom-2 right-2 bg-red-600 text-white font-bold p-2 text-center hover:bg-red-700 rounded-xl">Sair</button>
        </div>
    )
}