// 'use strict';
// const Hapi = require('@hapi/hapi');
// // require("dotenv-safe").config()
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const init=async()=>{
//   const server=Hapi.server({
//     port:4000,
//     host:"localhost"
//   })

//   server.route([{
//     method:'GET',
//     path:'/',   
//     handler:(Request,h)=>{
//         return "<h1>Hello world</h1>"
//     }
// },
// //,{
// //         method: 'GET',
// //         path: '/hello/{user}',
// //         handler: function (request, h) {
    
// //             return `Hello ${request.params.user}!`;
// //         }
// //   },{
// //     method: 'GET',
// //     path: '/user/{users?}',
// //     handler: function (request, h) {

// //         const user = request.params.users ? request.params.users : 'stranger';

// //         return `Hello ${user}!`;
// //     }
// // },{
// //     method: 'GET',
// //     path: '/Users/{user?}',
// //     handler: function (request, h) {

// //         return `Hello ${request.query.name}!`;
// //     }
// // },
// {
//   method: 'POST',
//   path: '/post',
//   handler: async (request, h) => {
//       try {
//           const newUser = await prisma.user.create({
//               data: request.payload,
//           });
//           return { status: 'success', message: 'User created successfully', newUser };
//       } catch (error) {
//           console.error(error);
//           return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
//       }
//   },
// },
// {
//   method: 'GET',
//   path: '/users',
//   handler: async (request, h) => {
//       try {
//           const users = await prisma.user.findMany();
//           return { status: 'success', message: 'Users retrieved successfully', users };
//       } catch (error) {
//           console.error(error);
//           return h.response({ status: 'error', message: 'Internal Server Error' }).code(500);
//       }
//   },
// },{
//   method: 'PUT',
//   path: '/users/{id}',
//   handler: async (request, h) => {
//       try {
//           const userId = parseInt(request.params.id);
//           const updatedUser = await prisma.user.update({
//               where: { id: userId },
//               data: request.payload,
//           });
//           return updatedUser;
//       } catch (error) {
//           console.error(error);
//           return h.response({ error: 'Internal Server Error' }).code(500);
//       }
//   },
// },{
//   method: 'DELETE',
//   path: '/users/{id}',
//   handler: async (request, h) => {
//       try {
//           const userId = parseInt(request.params.id);
          
//           await prisma.user.delete({
//               where: { id: userId },
//           });
//           return { message: 'User deleted successfully' };
//       } catch (error) {
//           console.error(error);
//           return h.response({ error: 'Internal Server Error' }).code(500);
//       }
//   },
// }])
