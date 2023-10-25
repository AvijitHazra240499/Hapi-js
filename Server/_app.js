const server=require("./config/server")
const baseRouter=require("./route/index")
const auth = require('./Middleware/auth')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const init=async()=>{

  const swaggerOptions = {
    documentationPath: '/docs',
  
    info:{
        title:'Test API Documentation with authentication',
        version:Pack.version,
    },
    securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
    },
    security: [{ jwt: [] }],
    schemes: ['http','https'],
    grouping: 'tags'
}


// Adding plugins for swagger docs;
await server.register([
    Inert,
    Vision,
    {
        plugin:HapiSwagger,
        options:swaggerOptions
    }
])
 

  // await server.register([Inert,Vision, {
  //   plugin: HapiSwagger,
  //   options: {
  //     info: {
  //       title: 'Your API Documentation',
  //       version: '1.0.0',
  //     },
  //   },
  // }]); 
  
    await server.register(require('hapi-auth-jwt2'))

    //   server.route([{
    //     method:'GET',
    //     path:'/',   
    //     handler:(Request,h)=>{
    //         return "<h1>Hello world</h1>"
    //     }
    // },
    // {
    //         method: 'GET',
    //         path: '/hello/{user}',
    //         handler: function (request, h) {
        
    //             return `Hello ${request.params.user}!`;
    //         }
    //   },{
    //     method: 'GET',
    //     path: '/user/{users?}',
    //     handler: function (request, h) {
    
    //         const user = request.params.users ? request.params.users : 'stranger';
    
    //         return `Hello ${user}!`;
    //     }
    // },{
    //     method: 'GET',
    //     path: '/Users/{user?}',
    //     handler: function (request, h) {
    
    //         return `Hello ${request.query.name}!`;
    //     }
    // }]),


    // await server.register({
    //     plugin: auth,
    //   });
  
    auth(server)

    await server.register(baseRouter)


await server.start()
console.log(`server is running on : ${server.info.uri}`)
}

process.on("unhandledRejection", err=>{
  console.log(err)
  process.exit(1)
})

init()