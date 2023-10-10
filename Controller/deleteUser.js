const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteUser=async (request, h) => {
    try {
        const userId = parseInt(request.params.id);
        
        await prisma.user.delete({
            where: { id: userId },
        });
        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal Server Error' }).code(500);
    }
}
module.exports=deleteUser
