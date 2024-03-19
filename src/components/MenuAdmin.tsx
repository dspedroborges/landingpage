import Link from "next/link";

export default function MenuAdmin() {
    return (
        <div className="text-white">
            <ul className="flex flex-row items-center justify-center bg-gray-950 border-b border-dashed">
                <Link href="/admin/filtrar" className="h-full w-full py-4 text-center hover:bg-gray-700 cursor-pointer"><li>Filtrar</li></Link>
                <Link href="/admin/estatistica" className="h-full w-full py-4 text-center hover:bg-gray-700 cursor-pointer"><li>Estatística</li></Link>
            </ul>
        </div>
    )
}