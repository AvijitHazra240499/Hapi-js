const Hapi = require('@hapi/hapi');
const server = Hapi.server({ port: 4000, host: 'localhost', routes: {
    cors: {
        origin: ['*']}}});
module.exports=server