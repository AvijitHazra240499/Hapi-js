const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updatedUser=async (request, h) => {
    try {
        const userId = parseInt(request.params.id);
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: request.payload,
        });
        return updatedUser;
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal Server Error' }).code(500);
    }
}
module.exports=updatedUser