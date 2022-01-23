const { checkJWT } = require('../helpers/jwt');

const { connectUser, disconnectUser } = require('../controllers/socket');
const { io } = require('../index');

io.on('connection', (client) => {
    console.log('client connected: ');
    const token = client.handshake.headers['x-token'];
    if (!token) {
        return client.disconnect();
    }

    const [valid, uid] = checkJWT(token);
    console.log(valid, uid);

    if (!valid) {
        console.error('Invalid token');
        return client.disconnect();
    }

    connectUser(uid);

    // add user to some chat room
    client.join(uid);


    client.on('send-message', (data) => {
        console.log(data);
    });

    client.on('disconnect', () => {
        console.log('client disconnected');
        disconnectUser(uid);
    });

});