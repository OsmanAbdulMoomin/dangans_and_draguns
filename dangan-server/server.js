//create a http server
const http = require("http");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

//link server to socket io, create websocket
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_USER_EVENT = "newUser";
const LOBBY_READY_EVENT = "lobbyReady";

var users = {};
var noOfUsers = 0;
const maxNoOfUsers = 2;
noOfUsers = Math.max(0, noOfUsers);

io.on("connection", (socket) => {
	console.log("socket connected");
	console.log(noOfUsers);
	console.log(socket.rooms);

	//join room
	const { roomId } = socket.handshake.query;

	socket.on(NEW_USER_EVENT, (user) => {
		if (noOfUsers >= maxNoOfUsers) {
			++noOfUsers;
			console.log(noOfUsers);
			socket.emit("lobbyFull");
		} else {
			socket.join(roomId);
			console.log(socket.rooms);
			socket.username = user;
			users[user] = user;
			++noOfUsers;

			socket.emit("login", {
				noOfUsers: noOfUsers,
				users: users,
			});
			socket.broadcast.emit("login", {
				noOfUsers: noOfUsers,
				users: users,
			});
		}
	});

	socket.on("disconnect", () => {
		delete users[socket.username];
		--noOfUsers;
		console.log(noOfUsers);
		io.emit("update", users);
	});

	console.log(socket.id);

	//message listener
	socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
		io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
	});

	// socket.on("new user", data =>{
	//   socket.userId = data;
	//   activeUsers.add(data);
	//   io.emit("new user", [...activeUsers])

	// });

	// disconnect the socket, if user leaves
	// socket.on("disconnect", ()=>{
	//   activeUsers.delete(socket.userId);
	//   io.emit("user disconnected", socket.userId)
	//   socket.leave(roomId);
	// });
});

//spin up the server, tell us what port its begun on
server.listen(PORT, () => {
	console.log(`Server started on port ${server.address().port} (y)`);
});
