import socketIO from 'socket.io';

export default function(server) {
  let io = new socketIO(server);
  io.on('connection', s => {
    console.log('Connected');
    s.emit('alert');
    io.on('disconnect', () => {
      console.log('Disconnected');
    });
  });
}
