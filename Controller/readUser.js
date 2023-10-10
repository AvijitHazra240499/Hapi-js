const { PrismaClient } = require('@prisma/client');
const { log } = require('../config/server');
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
module.exports=readUser