const { checkJWT } = require('../helpers/jwt');

const { connectUser, disconnectUser, saveMessage } = require('../controllers/socket');
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


    client.on('send-message', async (data) => {
        console.log(data);
        const saved = await saveMessage(data)
        if (!saved) {
            console.error('Message not saved');
            return;
        }
        io.to(data.to).emit('send-message', data);
    });

    client.on('disconnect', () => {
        console.log('client disconnected');
        disconnectUser(uid);
    });

});