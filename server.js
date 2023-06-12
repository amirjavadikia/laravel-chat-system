var app = require("express")();
var http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let Redis = require("ioredis");
let redis = new Redis();
let users = [];

http.listen(8005, () => {
    console.log("Listening on port 8005");
});
redis.subscribe("private-channel", function (){
    console.log("subscribe to private channel");
});

redis.on("message", function (channel, message){
    console.log(channel);
    message = JSON.parse(message);
    if (channel == 'private-channel') {
        let data = message.data.data;
        let receiver_id = data.receiver_id;
        let event = message.event;

        io.to(`${users[receiver_id]}`).emit(channel + ':' + message.event, data);
    }
    console.log(message);
})

io.on("connection", function (socket){
    socket.on("user_connected", function (user_id){
        users[user_id] = socket.id;
        io.emit("updateUserStatus", users);
        console.log("user connected "+ user_id);
    });

    socket.on("disconnect", function (){
        let i = users.indexOf("socket.id");
        users.splice(i, 1, 0);
        io.emit("updateUserStatus", users);
        console.log(users);
    });

});





