import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma.task //Quando exportamos algo default, poemos importar com qualquer nome