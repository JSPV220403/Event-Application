import bcrypt from "bcrypt"

import {prisma} from "../prisma"

import {Role, Gender} from "@prisma/client"

import {generateToken} from "../utils/jwt"
import { connect } from "node:http2"


export const register = async(data:any)=>{
    try{
        const existingUser = await prisma.users.findUnique(
            {
                where:{email:data.email}
            }
        )

        if(existingUser){
            return{
                success: false,
                message: "Email already exist",
                status: 400
            }
        }
        
        const hashedPassword= await bcrypt.hash(data.password, 10);

        const user = await prisma.users.create({
            data:{
               name: data.name,
               gender: data.gender==='MALE'? Gender.MALE: data.gender==='FEMALE'? Gender.FEMALE: Gender.OTHER,
               phone_number: data.phone_number,
               email:data.email,
               password: hashedPassword,
               role: data.role==='USER'? Role.USER: data.role==='ADMIN'? Role.ADMIN: Role.ORGANIZER,
            }
        })
        const user_id = await prisma.users.findUnique({
            where:{
                email: data.email
            },
            select:{
                id:true
            }
        })
        const address= await prisma.addresses.create({
            data:{
                
                address: data.address,
                pincode: data.pincode,

                user:{
                    connect:{
                        id: user_id?.id
                    }
                }
            }
        })

        if(data.role==="ADMIN" || data.role==="ORGANIZER"){
            const approvals = await prisma.approvals.create(
                {
                    data:{
                        user_id: user_id?.id,
                    }
                }
            )
            
        }

        return{
            success: true,
            status: 200,
            message: "User Registered",
            data: {
                user_id: user?.id
            }
        }

    }catch(e){
        console.log(e)
        return {
            success: false,
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const login= async(data:any)=>{
    try{
        const user = await prisma.users.findUnique({where:{email: data.email}})

        if(!user){
            return {
                success: false,
                status: 400,
                message: "User Not Found",
                data:{}
            }
        }

        const isPasswordCorrect = await bcrypt.compare(
            data.password, user.password!
        )

        if(!isPasswordCorrect){
            return {
                success: false,
                status: 401,
                message: "Invalid password",
                data:{}
            }
        }

        const token= generateToken(user)

        return {
            success: true,
            status: 200,
            message: "login successful",
            token
        }
    }
    catch(e){
        console.log(e)
        return {
            success: false,
            status: 500,
            message: "Internal Server Error"
        }
    }
}

