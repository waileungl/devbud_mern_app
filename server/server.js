const fs = require('fs');
const https = require('https');
const express = require('express')
const cors = require('cors');
const socketio = require('socket.io');
//mongoDB
const DB = 'devBud';

const options = {
    key: fs.readFileSync('path/to/ssl/key'),
    cert: fs.readFileSync('path/to/ssl/cert')
};


const app = express()
const port = 8000

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// --- CONNECT TO DB USING MONGOOSE ---
require('./config/mongoose.config')(DB);

// --- IMPORTS ROUTES after teh DB is connected ---
require('./routes/dev.routes')(app);

const server = https.createServer(options, app);
server.listen(port, () => console.log(`>>>>listening on port ${port}<<<<`));

const io = socketio(server);
// To use socket we have to pass in our server as a param
// const io = require("socket.io")(server, { cors: true })

// console.log(">>>>>>>>>>IO IS SET UP", io, "--------------------the code above is io")

io.on("connection", (socket) => {
    console.log("socket.io connected client:", socket.id);

    // 1) socket for complied code result
    // listen for the messege from the client
    socket.on("result sending to socket", (dataFromClient) => {
        console.log(`receiving result from user! ouput : ${dataFromClient}`);

        // send it over to whoever connected
        io.emit("result sending back from socket", dataFromClient)
        console.log(`trying to emit the result to all other user! ouput: ${dataFromClient}`);
    })
})