module.exports = {
    httpPort: process.env.httpPort || 80,
    
    //httpPort: process.env.httpPort || 4500,

    mongoHost: process.env.mongoHost || '127.0.0.1',
    mongoPort: process.env.mongoPort || 27017,
    mongoDataBase: process.env.mongoDataBase || 'adinno',

    // mongoHost: process.env.mongoHost || '192.168.1.112',
    // mongoUser: process.env.mongoUser || 'smart',
    // mongoPass: process.env.mongoPass || 'smart123',

}