const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt=require("bcrypt")
let fs = require('fs');

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

        // let queryparams = request.query;
        // if ("id" in queryparams) {
        //     queryparams.id = parseInt(request.query.id)
        // }
        // Use Prisma to query the database
        // const infos = await prisma.user.findUnique({
        //     where: {id:request.user.id}, // Use the query parameters to filter the results
        // });

        const infos=request.user
        
        return h.response({ infos, msg: "Get successfully" }).code(200);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return h.response('Error').code(500);
    } finally {
        await prisma.$disconnect();
    }
}



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

const fileUpload = async(req, h)=>{

//     try {
//         console.log('Received payload:', request.payload);
         
//           const { file } = request.payload;
//           if (!file) {
//             return h.response('No file uploaded.').code(400);
//           }
//           const uploadPath = Path.join(__dirname,"../Uploads",file.hapi.filename);
         
//           const fileStream = fs.createWriteStream(uploadPath);
         
//           const fileUpload =await  new Promise((resolve, reject) => {
//             file.on('data', (data) => {
//               fileStream.write(data);
//             });
         
//             file.on('end', () => {
//               fileStream.end();
//               resolve('File uploaded successfully.');
//             });
         
//             file.on('error', (err) => {
//               reject(err);
//             });
//           })
//           await prisma.Image.create({
//             data:{
//               filename:file.hapi.filename,
//               path:""
//             }
//           })
//           return h.response('File uploaded successfully.'+ `file name ${file.hapi.filename}`).code(201)
//         } catch (error) {
//           console.log(error.message)
//           return h.response('Error fetching image links').code(500);
//         }





    try {
        const { file } = req.payload;
          if (!file) {
            return h.response('No file uploaded.').code(400);
          }
        console.log(__dirname)
        const fileStream =  fs.createWriteStream(__dirname + "../../uploads/" + file.hapi.filename)

        await new Promise((res,rej)=>{
         try{
          file.on("data",(data)=>{
          fileStream.write(data)

          })
          file.on("end",()=>{
            res("file upload successfully")
          })
         }catch(err){
            rej(err)
         }
        })


         await prisma.Image.create({
            data:{
                file_name:file.hapi.filename,
                file_ext:""

            },
        });
    return h.response('File uploaded successfully.'+ `file name ${file.hapi.filename}`).code(201)

    } catch (error) {
        console.log(error)
        return h.response('Error fetching image links').code(500);
    }
}

const getImage=async (request, h) => {
    try {
    
        const Image = await prisma.Image.findMany({where:
        {file_name:request.params.file_name}    
        });
     
       
     return h.file(__dirname + "../../uploads/" + request.params.file_name)
          
                

            
    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
    }
}
module.exports={createUserController:createUser,deleteUser,readUserController:readUser,getUser,updatedUser,getImage,fileUpload}   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 