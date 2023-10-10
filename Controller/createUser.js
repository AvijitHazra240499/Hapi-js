const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const createUser=async (request, h) => {
    try {
    const hashedPassword = await bcrypt.hash(request.payload.password, 10);
    request.payload.password=hashedPassword
        const newUser = await prisma.user.create({
            data: request.payload,
        });
        return h.response({ newUser, message: 'successs' }).code(201);
      
    
    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
    }
}

const login=async(request,h)=>{
    try{
    const{email,password}=request.payload
    const user=await prisma.user.findUnique({ where: {
        email: email, 
      }})
    if(!user){
        return h.response({ status: 'error', message: 'user not available' }).code(404);

    }
    const token = jwt.sign({ userId: user.id }, "Avijit_Hazra");

    return  h.response({ status: 'successfull', message: 'Token generated successfully',token }).code(200);

} catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
}
}

module.exports={createUserController:createUser,login}   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 