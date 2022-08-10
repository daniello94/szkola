require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
const userApi = require("./api/userApi")
const chatApi = require("./api/chatApi")
const config = {
    origin: 'http://' + process.env.DB_HOST
};

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const socketMessages = require("./sockets/messages")
socketMessages(io)
app.use(express.json());
app.use(cors());
app.use('/img',express.static('images'));

app.use("/api/user", userApi)
app.use("/api/chat", chatApi)


app.get("/", cors(config), function (req, res) {
    res.status(219).json("Projekt Szkoła")
});

http.listen(process.env.PORT, function () {
    console.log(`Serwer na porcie ${process.env.PORT} działa bez zarzutów`);

});