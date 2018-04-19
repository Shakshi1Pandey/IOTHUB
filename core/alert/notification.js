import socketIO from 'socket.io';

export default function(server,notify) {
  console.log(notify,'notify');
  let io = new socketIO(server);
  io.on('connection', s => {
    console.log('Connected');
    s.emit('123445123445','data');
    io.on('disconnect', () => {
      console.log('Disconnected');
    });
  });

}
