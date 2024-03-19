import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());      
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);  
        const result = await prisma.lead.count({
            where: {
                id: String(id),
                createdAt: {
                    gte: startOfDay,
                    lt: endOfToday,
                }
            }
        });

        console.log({result})
        
        res.status(200).json({ isReal: result > 0 ? true: false })
    } else {
        res.status(405).json({ error: true, content: 'Método não permitido' })
    }
}
