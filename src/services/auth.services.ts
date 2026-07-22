import bcrypt from "bcrypt"

import {prisma} from "../prisma"

import {Role, Gender} from "@prisma/client"

import validator from "validator";

import {generateToken} from "../utils/jwt"

import { registrationTemplate } from "../../templates/registration.template";

import { sendMail } from "./mail.service";



export const register = async(data:any)=>{
    try{
        if(data?.name==undefined){
            return{
                status:400,
                message: "name field is undefined"
            }
        }
        if(data?.gender==undefined){
            return{
                status:400,
                message: "gender field is undefined"
            }
        }
        if(data?.phone_number==undefined){
            return{
                status:400,
                message: "phone number field is undefined"
            }
        }
        if(data?.email==undefined){
            return{
                status:400,
                message: "email field is undefined"
            }
        }
        if(data?.password==undefined){
            return{
                status:400,
                message: "password field is undefined"
            }
        }
        if(data?.role==undefined){
            return{
                status:400,
                message: "role field is undefined"
            }
        }
        if(data?.address==undefined){
            return{
                status:400,
                message: "address field is undefined"
            }
        }
        if(data?.pincode==undefined){
            return{
                status:400,
                message: "pincode field is undefined"
            }
        }

        const existingUser = await prisma.users.findFirst(
            {
                where:{
                    OR:[
                        {
                            email: data?.email
                        },
                        {
                            phone_number: data?.phone_number
                        }
                    ]                   
                }
            }
        )

        if(existingUser){
            return{
                success: false,
                message: "Email/Phone number already exist",
                status: 400
            }
        }

        if(!validator.isStrongPassword(
            data.password,{
                minLength:8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols:1
            }
        )){
            return{
                success: false,
                status: 400,
                message: "Password not satisfying the constraints"
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

        const html= await registrationTemplate(data?.name, data?.email,data?.role);
        await sendMail("Registration Successfull",html)

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


        if(data?.email==undefined){
            return {
                status: 400,
                message: "email field is undefined"
            }
        }

        if(data?.password==undefined){
            return {
                status: 400,
                message: "password field is undefined"
            }
        }
        
        const user = await prisma.users.findUnique({where:{email: data?.email}})

        if(!user){
            return {
                success: false,
                status: 400,
                message: "User Not Found",
                data:{}
            }
        }

        const isPasswordCorrect = await bcrypt.compare(
            data?.password, user.password!
        )

        if(!isPasswordCorrect){
            return {
                success: false,
                status: 401,
                message: "Invalid password",
                data:{}
            }
        }

        const token= await generateToken(user)

        return {
            success: true,
            status: 200,
            message: "login successful",
            token: token,
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
