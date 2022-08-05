const Message = require("../api/models/Message")

module.exports = function (io) {
  console.log("sockets");
  io.on("connection", (socket) => {
    // Get the last 10 messages from the database.
    Message.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, messages) => {
        if (err) return console.error(err);

        // Send the last messages to the user.
        socket.emit("init", messages);
      });

    // Listen to connected users for a new message.
    socket.on("message", (msg) => {
      // Create a message with the content and the name of the user.
      const message = new Message({
        content: msg.content,
        name: msg.name,
        classNr: msg.classNr
      });

      console.log(message);

      // Save the message to the database.
      message.save((err) => {
        if (err) return console.error(err);
      });

      // Notify all other users about a new message.
      socket.broadcast.emit("push", message);
    });
  });
};
