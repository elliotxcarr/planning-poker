
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  const getGenerated = () => {
      const id = Math.floor(Math.random() * 1000).toString();
      return id;
    }

  const setUpRoom = (id, playerName) => {
    const room = rooms.get(id);
    const playerId = uuid();
    const player = { id: playerId, name: playerName, vote: null, socketId: socket.id };
    room.players.push(player);

    socket.join(id);
    io.to(id).emit("update_room", room);
    socket.emit("player_id", playerId);
  };

  socket.on('create_room', ({name}) => {
    const id = getGenerated();
    rooms.set(id, {id: id, players: [], revealed: false, votes: []})
    setUpRoom(id, name)
  });

  socket.on('join_room', ({id, name}) => {
    if(!rooms.has(id)) {
      socket.emit('error', 'No room with that ID exists');
      return;
    }
    setUpRoom(id, name)
  });

  socket.on('vote', ({ roomId, playerId, vote}) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const player = room.players.find(p => p.id === playerId);

    player.vote = vote;
    room.votes.push(vote)
    io.to(roomId).emit('update_room', room)
  });

  socket.on('reveal', ({ roomId}) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.revealed = true;
    io.to(roomId).emit('update_room', room)
  });

  socket.on('reset', ({roomId}) => {
    const room = rooms.get(roomId);
    if(!room) return;
    if(room.players.every(a => a.vote === null)) return;
    const updated = room.players.map(p => {
      p.vote = null;
      return p;
    });
    room.players = updated;
    room.votes = [];
    room.revealed = false;
    io.to(roomId).emit('update_room', room)
  })

  socket.on('leave', () => {
    socket.rooms.forEach(roomId => {
      const room = rooms.get(roomId);
      if(!room) return;
      room.players = room.players.filter(p => p.socketId !== socket.id);
      io.to(roomId).emit('update_room', room)
    })
  })
})

server.listen(3001, () => console.log('Server running on port 3001'))