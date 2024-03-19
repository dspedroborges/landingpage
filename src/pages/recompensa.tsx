import { useRouter } from "next/router"
import { useQuery } from "react-query";

export default function Recompensa() {
    const router = useRouter();
    const id = router.query.id;

    const lead = useQuery([`/api/lead/getById?id=${id}`], async () => {
        const response = await fetch(`/api/lead/getById?id=${id}`)
        return response.json()
    }, {
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            {
                lead?.data?.isReal ? (
                    <div className="text-white">
                        <h2 className="font-bold text-center text-2xl my-4">Muito obrigado!</h2 >
                        <p className="text-center">Aqui está sua recompensa:</p>
                    </div >

                ) : (
                    <div className="text-white">
                        <h2 className="font-bold text-center text-2xl my-4">Não autorizado!</h2 >
                    </div>
                )
            }
        </>
    )
}