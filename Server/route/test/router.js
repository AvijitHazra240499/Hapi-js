const {createUserController,getImage,deleteUser,readUserController,getUser,updatedUser,fileUpload}=require("../../Controller/crud")
const login=require("../../Controller/login")
const Joi = require('joi');
// const image=require("../../Controller/image")
const router=[{
    method: 'POST',
    path: '/post',
    // config: { auth: false },
    handler: createUserController,
    options: {  
        auth:false,
        description: 'Description of your route',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                name:  Joi.string().required(),
                email:  Joi.string().email().required(),
                password: Joi.string().required()
            })
        }
      },
},{
    method: 'POST',
    path: '/login',
    // config: { auth: false },
    handler: login,
    options: {  
        auth:false,
        description: 'Description of your route',
        tags: ['api'],
        validate: {
            payload: Joi.object({
             
                email:  Joi.string().email().required(),
                password: Joi.string().required()
            })
     }
     },

},
{
    method: 'GET',
    path: '/users',
  
        handler: readUserController,
        // config: { auth: "jwt" },
        options: {  
             auth: "jwt" ,
            description: 'Description of your route',
            tags: ['api'],
            // Other options for validation, authentication, etc.
          },
},
{
    method: 'GET',
    path: '/users/{id}',
  
        handler: getUser,
        // config: { auth: "jwt" }
        options: {  
            auth: "jwt" ,
           description: 'Description of your route',
           tags: ['api'],
           validate: {
            params: Joi.object({
                id: Joi.number().required()
            })
        }
         },
      
},
{
    method: 'PUT',
    path: '/users/{id}',
    // config: { auth: "jwt" },
    handler: updatedUser,
    options: {  
        auth: "jwt" ,
       description: 'Description of your route',
       tags: ['api'],

     validate: {
        params: Joi.object({
            id: Joi.number().required()
        }),
        payload: Joi.object({
            // id: Joi.number().required(),
            name:  Joi.string().required(),
            email:  Joi.string().email().required()
        })
    }
}
},{
    method: 'DELETE',
    path: '/users/{id}',
    // config: { auth: "jwt" },
    handler: deleteUser,
    options: {  
        auth: "jwt" ,
       description: 'Description of your route',
       tags: ['api'],
       validate: {
        params: Joi.object({
            id: Joi.number().required()
        }),
        // payload: Joi.object({
        //     id: Joi.number().required(),
        //     name:  Joi.string().required(),
        //     email:  Joi.string().email().required()
        // })
    }
     }
     },
     {
        path:'/file-upload',
		method:'post',
		options:{
			payload: {
                output: 'stream',
                multipart: true
            },
            auth:false,
			handler: fileUpload,
            description:"File upload",
        	notes:'file-upload',
        	tags:['api'],
			plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }, 
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .description('file')
                })
            },
        }
     }, 
     {
        path:'/{file_name}',
		method:'get',
		options:{
			
            auth:false,
			handler: getImage,
            description:"File upload",
        	notes:'file-upload',
        	tags:['api'],
            validate: {
                params: Joi.object({
                    file_name:Joi.string().required()
                })
            }
        }
     }
];

module.exports=router