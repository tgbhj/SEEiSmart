module.exports = {
    httpPort: process.env.httpPort || 80,
    //httpPort: process.env.httpPort || 4500,
    // mongoUser: process.env.mongoUser || 'smart',
    // mongoPass: process.env.mongoPass || 'smart123',
    mongoHost: process.env.mongoHost || '127.0.0.1',
    // mongoHost: process.env.mongoHost || '192.168.1.112',
    mongoPort: process.env.mongoPort || 27017,
    mongoDataBase: process.env.mongoDataBase || 'adinno'
}