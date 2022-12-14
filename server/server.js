const fs = require("fs")
const express = require('express')
const cors = require('cors');
const PythonShell = require('python-shell').PythonShell;

//mongoDB
const DB = 'devBud';

// generate file component
const { generateFile } = require('./controllers/generateFile');
const { executeJava } = require('./controllers/executeJava')
const { deleteFile } = require('./controllers/deleteFile');
const { Socket } = require("socket.io");

const app = express()
const port = 8000

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// --- CONNECT TO DB USING MONGOOSE ---
require('./config/mongoose.config')(DB);

// --- IMPORTS ROUTES after teh DB is connected ---
require('./routes/dev.routes')(app);

const errorHandler = (error) => {
    err = String(error.error)
    // let hiddenStart = "";
    // let hiddenEnd = "";
    // for (let i = 0; i < err.length; i++) {
    //     if (err[i] == "F" && err[i + 1] == "i" && err[i + 2] == "l" && err[i + 3] == "e") {
    //         hiddenStart = i
    //     } else if (err[i] == "," && err[i + 2] == "l" && err[i + 3] == "i" && err[i + 4] == "n") {
    //         hiddenEnd = i + 1
    //     }
    // }
    // errMessege = err.replace(err.substring(hiddenStart, hiddenEnd), "");
    return err
}


app.post('/compile', async (req, res) => {
    const language = req.body.language;
    const code = req.body.code;

    // prevent empty code send by user
    if (code === undefined) {
        return res.status(400).json({
            success: false,
            error: "Your code is empty!"
        })
    }
    try {
        // generate the specific language compiler file
        var filepath = await generateFile(language, code);
        // execute the compile file from the filepath
        const output = await executeJava(filepath, language);
        await deleteFile(filepath);

        return res.json({ output })
    } catch (err) {
        await deleteFile(filepath);
        const error = errorHandler(await err)
        res.json({ error });
    }
})

const server = app.listen(port, () => console.log(`>>>>listening on port ${port}<<<<`))

// To use socket we have to pass in our server as a param
const io = require("socket.io")(server, {cors: true})

// different types of socket calls

// emitters - "I have this thing and emitting it (sending something to somewhere)"

//  on(onChange/onClick => on specific event and then trigger something) - trigger - for listening for a particular even


// At this point, the server start connection by using the built-in key word 'connection' and pass back a call back function
io.on("connection", (socket) => {
    console.log("socket.io connected client:", socket.id);

    // 1) socket for code editor /
    // listen for the messege from the client
    socket.on("user typing code", (dataFromClient) => {
        console.log(dataFromClient);

        // send it over to whoever connected
        io.emit("code sending back", dataFromClient)
    })

    // 2) socket for complied code result
    // listen for the messege from the client
    socket.on("result sending to socket", (dataFromClient) => {
        console.log(dataFromClient);

        // send it over to whoever connected
        io.emit("result sending back from socket", dataFromClient)
    })
})