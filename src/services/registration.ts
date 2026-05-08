import {prisma} from "../prisma"

export const registration = async(data: any)=>{
  const user = await prisma.users.create({
    data:{
      "name": data.name,

      }
  })
  console.log(user)
}

//registration({})