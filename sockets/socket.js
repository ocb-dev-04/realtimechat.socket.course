const { io }= require('../index');

io.on('connection', (client) => {
    console.log('client connected: ');
    
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    client.on('vote', (data) => {
        console.log(data.id);
    });

    client.on('add-band', (data) => {
        console.log(data.name);
    });

    client.on('delete-band', (data) => {
        console.log(data.id);
    });
});