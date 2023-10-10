const server=require("./config/server")
const baseRouter=require("./route/router")
const auth = require('./Middleware/auth')


const init=async()=>{
     
  

      server.route([{
        method:'GET',
        path:'/',   
        handler:(Request,h)=>{
            return "<h1>Hello world</h1>"
        }
    },
    {
            method: 'GET',
            path: '/hello/{user}',
            handler: function (request, h) {
        
                return `Hello ${request.params.user}!`;
            }
      },{
        method: 'GET',
        path: '/user/{users?}',
        handler: function (request, h) {
    
            const user = request.params.users ? request.params.users : 'stranger';
    
            return `Hello ${user}!`;
        }
    },{
        method: 'GET',
        path: '/Users/{user?}',
        handler: function (request, h) {
    
            return `Hello ${request.query.name}!`;
        }
    }]),


    // await server.register({
    //     plugin: auth,
    //   });


    await server.register(baseRouter)


await server.start()
console.log(`server is running on : ${server.info.uri}`)
}

process.on("unhandledRejection", err=>{
  console.log(err)
  process.exit(1)
})

init()