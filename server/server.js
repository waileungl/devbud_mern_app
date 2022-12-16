const express = require('express')
const cors = require('cors');
//mongoDB
const DB = 'devBud';

const app = express()
const port = 8000

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Set the Referrer-Policy header in all HTTP responses
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// --- CONNECT TO DB USING MONGOOSE ---
require('./config/mongoose.config')(DB);

// --- IMPORTS ROUTES after teh DB is connected ---
require('./routes/dev.routes')(app);


const server = app.listen(port, () => console.log(`>>>>listening on port ${port}<<<<`))

// To use socket we have to pass in our server as a param
const io = require("socket.io")(server, { cors: true })

console.log(">>>>>>>>>>IO IS SET UP", io, "--------------------the code above is io")
// different types of socket calls

// emitters - "I have this thing and emitting it (sending something to somewhere)"

//  on(onChange/onClick => on specific event and then trigger something) - trigger - for listening for a particular even

// At this point, the server start connection by using the built-in key word 'connection' and pass back a call back function
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