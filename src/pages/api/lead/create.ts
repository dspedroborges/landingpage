import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        let { name, email, tel, age, gender } = req.body
        if (name !== "" && email !== "" && tel !== "" && age !== "" && gender !== "") {
            const checkEmail = await prisma.lead.count({
                where: { email }
            });
            const checkTel = await prisma.lead.count({
                where: { tel }
            });

            if (checkEmail === 0 && checkTel === 0) {
                const createdLead = await prisma.lead.create({
                    data: {
                        name, email, tel, age: Number(age), gender
                    },
                });
                res.status(201).json({ error: false, content: "Cadastrado com sucesso.", id: createdLead.id })
            } else {
                res.status(400).json({ error: true, content: "Email ou telefone já usado." })
            }
        } else {
            res.status(400).json({ error: true, content: 'Dados inválidos' })
        }
    } else {
        res.status(405).json({ error: true, content: 'Método não permitido' })
    }
}
