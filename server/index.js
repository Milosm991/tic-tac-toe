const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')

const PORT = process.env.PORT || 7000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connect', (socket) => {
    socket.on('join_room', ( {roomId, name}, callback) => {
        socket.join(roomId)

        socket.emit('message', { text: `${name} has joined the game!`})
        socket.broadcast.to(roomId).emit('message', {text: `Second player ${name}, is here, you can start!` });
        
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('message', { text: `${name} left the room!`})
        })
    })

    socket.on('clickedField', ({ index, turn, roomId }) => {
        console.log(index, turn, roomId);
        socket.broadcast.to(roomId).emit('field', {fieldIndex: index, whosNext: turn})
       
    })

   
})

app.use(router);
app.use(cors())

server.listen(PORT, () => console.log(`start at ${PORT}`));



        
     