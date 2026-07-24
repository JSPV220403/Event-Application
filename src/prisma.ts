import "dotenv/config"

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_TEST!,
})

export const prisma = new PrismaClient({
  adapter,
})

console.log("Prisma working")