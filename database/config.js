const mongoose = require('mongoose');

// set database connection
const dbConnection = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = { 
    dbConnection
}