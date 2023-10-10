const {createUserController,login}=require("../Controller/createUser")
const readUserController=require("../Controller/readUser")
const updatedUserController=require("../Controller/updateUser")
const deleteUserController=require("../Controller/deleteUser")
const auth=require("../Middleware/auth")

const router=[{
    method: 'POST',
    path: '/post',
    handler: createUserController,
},{
    method: 'POST',
    path: '/login',
    handler: login,
},
{
    method: 'GET',
    path: '/users',
  
        handler: readUserController,
        // config: {
        //     auth: "auth.strategy.name", // Require JWT authentication for this route
        //     plugins: {
        //       hapiAuthorization: { roles: ['admin'] }, // Require 'admin' role for authorization
        //     },
        //   },
},{
    method: 'PUT',
    path: '/users/{id}',
    handler: updatedUserController,
},{
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUserController
}];

module.exports = {
	name:'base-route',
	version:'1.0.0',
	register:(server,options)=>{
		server.route(router);
	}
}