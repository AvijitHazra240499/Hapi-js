const {createUserController,login}=require("../Controller/createUser")
const {readUserController,getUser}=require("../Controller/readUser")
const updatedUserController=require("../Controller/updateUser")
const deleteUserController=require("../Controller/deleteUser")

const router=[{
    method: 'POST',
    path: '/post',
    config: { auth: false },
    handler: createUserController,
},{
    method: 'POST',
    path: '/login',
    config: { auth: false },
    handler: login,
},
{
    method: 'GET',
    path: '/users',
  
        handler: readUserController,
        config: { auth: "jwt" }
},
{
    method: 'GET',
    path: '/users/params',
  
        handler: getUser,
        config: { auth: "jwt" }
},
{
    method: 'PUT',
    path: '/users/{id}',
    config: { auth: "jwt" },
    handler: updatedUserController,
},{
    method: 'DELETE',
    path: '/users/{id}',
    config: { auth: "jwt" },
    handler: deleteUserController
}];

module.exports = {
	name:'base-route',
	version:'1.0.0',
	register:(server,options)=>{
		server.route(router);
	}
}