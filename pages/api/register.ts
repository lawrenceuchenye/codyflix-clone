import bcrypt from "bcrypt";
import  type { NextApiRequest,NextApiResponse} from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== "POST"){
        return res.status(403).json({ error:"Unsupported Request"})
    }

    try{
        const { name,password,email}=req.body; 
        const existingUser=await prismadb.user.findUnique({
            where:{
                email
            }
        });


        if(existingUser){
            return res.status(422).json({"error":'Email taken!!'});
        }

        const hashedPassword=await bcrypt.hash(password,12);
        const user=await prismadb.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image:".",
                emailverified:new Date()
            }
        });

        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json(err);
    }
}
