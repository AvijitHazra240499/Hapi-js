const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const readUser=async (request, h) => {
    try {
        const users = await prisma.user.findMany();
        
        return { status: 'success', message: 'Users retrieved successfully', users };
    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
    }
}
const getUser = async (request, h) => {
    try {

       
        const infos=request.user

        return h.response({ infos, msg: "Get successfully" }).code(200);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return h.response('Error').code(500);
    } finally {
        await prisma.$disconnect();
    }
}


module.exports={readUserController:readUser,getUser}