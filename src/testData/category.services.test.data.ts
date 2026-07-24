import { userInfo } from "node:os";
import { prisma } from "../prisma";

async function getCategoryTestData() {
    const User = await prisma.users.findFirst({
        where:{
            email:"user1@gmail.com"
        }
    })

    const Organizer = await prisma.users.findFirst({
        where:{
            email:"organizer1@gmail.com"
        }
    })

    const Admin = await prisma.users.findFirst({
        where:{
            email:"admin1@gmail.com"
        }
    })

    const pendingOrganizer = await prisma.users.findFirst({
        where:{
            email:"organizer2@gmail.com"
        }
    })

    const pendingAdmin = await prisma.users.findFirst({
        where:{
            email:"admin2@gmail.com"
        }
    })

    const category = await prisma.categories.findFirst({
        where:{
            name:"Pottery"
        }
    })

    return {
        user:{
            id:User?.id,
            name:User?.name,
            phoneNumber:User?.phone_number,
            email: User?.email,
            role:User?.role,
            status:"PENDING",
        },
        organizer: {
            id: Organizer?.id,
            name: Organizer?.name,
            phoneNumber:Organizer?.phone_number,
            email:Organizer?.email,
            role:Organizer?.role,
            status:"APPROVED",
        },
        admin: Admin,
        pendingOrganizer:{
            id: pendingOrganizer?.id,
            name:pendingOrganizer?.name,
            phoneNumber: pendingOrganizer?.phone_number,
            email: pendingOrganizer?.email,
            role:pendingOrganizer?.role,
            status:"PENDING",
        },
        pendingAdmin:{
            id: pendingAdmin?.id,
            name: pendingAdmin?.name,
            phoneNumber: pendingAdmin?.phone_number,
            email: pendingAdmin?.email,
            role: pendingAdmin?.role,
            status:"PENDING",
        },
        invalidCategoryId:{
            id:"123",
            name:"dance"
        },

        withoutCategoryId:{
            name:"dance"
        },

        existingName:{
            id: category?.id,
            name: category?.name
        }

    }
}



export default getCategoryTestData;