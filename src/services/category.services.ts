import { resourceUsage } from "node:process"
import {prisma} from "../prisma"

export const createCategory = async(data:any, user:any)=>{
    try{
        
        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }

        if(data?.name==undefined){
            return{
                status:400,
                message: "category name field is undefined"
            }
        }
        
        const isExist= await prisma.categories.findFirst({
            where:{
                name: String( data?.name).toLowerCase(),
                is_active:true
            }
        })
        
        if(isExist){
            return {
                status: 400,
                message: "Category name Already exist"
            }
        }

        const category= await prisma.categories.create({
            data:{
                name: String(data?.name).toLowerCase(),
                user:{
                    connect:{
                        id:user?.id
                    }
                }
            }
        })
        
        return {
            status: 200,
            message: "Category created"
        }
        
    }catch(e){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const listCategory = async()=>{
    try{
        const result = await prisma.categories.findMany({
            where:{
                is_active:true
            }
        })
        
        return {
            status: 200,
            message: "Successfully",
            data: result
        }
    }catch(e){
        return {
            status: 500,
            message: "Internal server error",
        }
    }
}

export const updateCategory = async(data:any, user:any)=>{
    try{

        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }

         if(data?.id==undefined){
            return{
                status:400,
                message: "category id field is undefined"
            }
        }

        if(data?.name==undefined){
            return{
                status:400,
                message: "category name field is undefined"
            }
        }


        const category = await prisma.categories.findUnique({
            where:{
                id: data?.id,
                is_active: true,
            }
        })

        if(!category){
            return {
                status: 404,
                message: "Category not found",
            }
        }

        if(category.created_by!=user?.id && user?.role!= "ADMIN"){
            return{
                status: 401,
                message: "UnAthorized to change"
            }
        }

        const isExist= await prisma.categories.findFirst({
            where:{
                name: String( data?.name).toLowerCase(),
                is_active:true
            }
        })
        
        if(isExist){
            return {
                status: 400,
                message: "Category name Already exist"
            }
        }

        const result= await prisma.categories.update({
            where:{
                id: data?.id
            },
            data:{
                name: String(data?.name).toLowerCase()
            }
        })

        return {
            status: 200,
            message: "Updated Successfully"
        }
    }catch(e){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const deleteCategory = async(data:any, user:any)=>{
     try{
        if(user?.status=="PENDING"){
            return {
                status: 401,
                message: "you are not ADMIN/ORGANIZER"
            }
        }

        if(data?.id==undefined){
            return {
                status: 400,
                message: "category id field is undefined"
            }
        }
        
            const category= await prisma.categories.findUnique({
                where:{
                    id: data?.id
                }
            })
            if(!category){
                return {
                    status: 404,
                    message: "Category not found"
                }
            }
            if(category.created_by!= user?.id && user?.role!= "ADMIN"){
                return {
                    status: 401,
                    message: "UnAuthorized person"
                }
            }
            await prisma.categories.update({
                where:{
                    id: data?.id
                },
                data:{
                    is_active: false
                }
            })
            return {
                status: 200,
                message: "Category deleted Successfully"
            }
        
    }catch(e){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export const getCategoryById = async(data:any, user:any)=>{
    try{
        if((user.role == "ADMIN"||user.role=="ORGANIZER") && user.status=="PENDING"){
            return {
                status: 401,
                message: "UnAuthorized person",
            }
        }
        console.log(data);
        if(data?.id==undefined){
            return{
                status:400,
                message:"category id is undefined"
            }
        }
        const result = await prisma.categories.findUnique({
            where:{
                id: data?.id,
                is_active:true
            }
        })

        if(!result){
            return {
                status: 404,
                message: "Category not found",
            }
        }

        return{
            status: 200,
            message: "Successfull",
            data: result
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Internal server error",
            data:{}
        }
    }
}