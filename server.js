const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const express = require ('express');
const session = require('express-session')
const routes = require('./routes/rutasBack'); // import the routes

const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const app = express()
const apiPort = 3333
const cookie_secret = '3j3k9kj23kjio8d'
//const MongoStore = require('connect-mongo');
const dbConnection = require('./db')
//sessions
app.use(session({
    //store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/pasayo" }),
    store: db,
    secret: cookie_secret,
    resave: false,
    saveUninitialized: false
}));

app.use( (req, res, next) => {
//  console.log('req.session', req.session);
  return next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
app.use(cors({
  origin: "https://pasayotexto.fi.uncoma.edu.ar" ,
  credentials: true
}))

app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', routes); //to use the routes

const server = app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
////////////////////////////////////////////
//comentar en producción
//const io = require('socket.io')(server);
//const httpServer = createServer(app);
////////////////////////////////////////////


////////////////////////////////////////////
//oficial en fai
const io = new Server(server, { cors: {
    origin: "https://pasayotexto.fi.uncoma.edu.ar",
    //origin: "http://localhost:8000",
    credentials: true
  } })
//oficial en fai
////////////////////////////////////////////

//webSockets
io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //este evento es el que captura el coding
  socket.on('canalIn', ({ experiencia, canal }, callback) => {
    socket.join(canal);
    //console.log('canalIn: ' + canal);
    //callback()
  });

  socket.on('codeoEvent', function(data) {
    //console.log('emitiendo al canal: ' + data.canal+ ' el code '  + data.newCode);
    socket.broadcast.to(data.canal).emit('codeoEmit', data);
  })
}

)
