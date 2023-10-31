const Hapi = require('@hapi/hapi');
const path=require("path")
const server = Hapi.server({
    port: 4000, host: 'localhost', routes: {
        cors: {
            origin: ['*']
        },
        
          files:{
            relativeTo:path.join(__dirname,'../uploads')
          }  
        
    }
});
module.exports = server