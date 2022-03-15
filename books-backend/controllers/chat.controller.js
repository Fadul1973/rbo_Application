
module.exports.respond = function (endpoint, socket) {

    console.log(`A user connected with the ID: ${socket.id}`);

      socket.on('disconnect', () => {

        console.log(`A user disconnected with the ID: ${socket.id}`);
    });

    // registering a new event
    socket.on('SEND_MESSAGE', (msg) => {
        console.log('Server Received: ' + JSON.stringify(msg));
        endpoint.emit('MESSAGE',  msg);
    });

  //for a new user joining the room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User with the ID:" + socket.id + " " + "Has joined the room!");
    });

 //user sending message
  socket.on("send_message", (data) => {
    socket.to(data.roomname).emit("receive_message", data)
  });
  
}
