import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const averageAge = await prisma.lead.aggregate({
            _avg: {
                age: true
            }
        });

        const gendersCount = await prisma.lead.groupBy({
            by: ["gender"],
            _count: {
                gender: true
            }
        });

        console.log(averageAge);
        console.log(gendersCount);

        const total = await prisma.lead.count();

        const proportionByGender = gendersCount.map(item => ({
            gender: item.gender,
            proportion: item._count.gender / total
          }));

        const result = {
            averageAge: averageAge._avg.age,
            proportionByGender
        }

        res.status(200).json(result)
    } else {
        res.status(405).json({ error: true, content: 'Método não permitido' })
    }
}
