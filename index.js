const path = require('path');
const express = require('express');
require('dotenv').config();

// db config
const { dbConnection } = require('./database/config');
dbConnection();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/account', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/messages', require('./routes/messages'))

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
    if (err) throw new Error(err);
    const timestamp = Date.now();
    console.log(`Server is listening on => http://localhost:${PORT} server timestamp => ${timestamp}`);
});