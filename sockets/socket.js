const { io }= require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

io.on('connection', (client) => {
    console.log('client connected: ');
    
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    client.on('vote', (data) => {
        console.log(data.id);
        bands.voteFor(data.id);
        // then, send new data to all clients
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (data) => {
        console.log(data.name);
        // add band to the list
        bands.addBand(new Band(data.name));
        // then, send new data to all clients
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (data) => {
        console.log(data.id);
        // add band to the list
        bands.deleteBand(data.id);
        // then, send new data to all clients
        io.emit('active-bands', bands.getBands());
    });
    // client.on('emitir-mensaje', (data) => {
    //     console.log('nuevo-mensaje', data);
    //     client.broadcast.emit('nuevo-mensaje', data);
    // });
});