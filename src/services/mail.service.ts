import { resend } from "../config/resend";

export const sendMail = async(subject:string,html:string)=>{
    try{
       const result= await resend.emails.send({
            from:"onboarding@resend.dev",
            to:"praveen.narayanan@bigthinkcode.com",
            subject,
            html,
        });
        console.log("Mail send successfully: ",result);
    }catch(e){
        console.log("Email error: ",e);
    }
}