import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { age, gender } = req.query;        
        let result;
        if (gender === "n/a") {
            result = await prisma.lead.findMany({
                where: {
                    age: {
                        gt: Number(age)
                    }
                }
            });
        } else {
            result = await prisma.lead.findMany({
                where: {
                    age: {
                        gt: Number(age)
                    },
                    gender: String(gender)
                }
            });
        }
        
        res.status(200).json(result)
    } else {
        res.status(405).json({ error: true, content: 'Método não permitido' })
    }
}
