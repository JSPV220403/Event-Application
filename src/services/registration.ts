import {prisma} from "../prisma"

async function main() {
  const users = await prisma.users.findMany();

  console.log(users);
}

main();