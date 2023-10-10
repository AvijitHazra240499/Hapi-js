const Hapi = require('@hapi/hapi');
const server = Hapi.server({ port: 4000, host: 'localhost' });
module.exports=server