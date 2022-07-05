const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
const express = require ('express');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const routes = require('./routes/rutasBack'); // import the routes
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
//const passport = require('./passport');
const app = express()
const apiPort = 3333
const cookie_secret = '3j3k9kj23kjio8d'
const MongoStore = require('connect-mongo')
const dbConnection = require('./db')
//sessions
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: MongoStore.create({
      mongoUrl:'mongodb://127.0.0.1:27017/pasayo'
    }),
    secret: cookie_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
       secure: false,
       httpOnly: true,
       sameSite: 'none',
       maxAge: 60 * 60 * 24 * 1000
 },
}));



app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

//--se cambian 4 cosas
//0-cambiar acá la url del socket y en CodeMirror2
//1- en client/api/index
//2- saca la línea proxy de client/package.jason y
//3- se descomenta acá abajo
app.use(cors({
  origin: true ,
  credentials: true
}))
//app.use(cors({
//  origin: "http://localhost:8000" ,
//  credentials: true
//}))


//app.use(passport.initialize())
//app.use(passport.session()) // calls serializeUser and deserializeUser

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
    //DECOMENTAR EN PROD
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
  socket.on('canalIn', ({ experiencia, canal, user }, callback) => {
    socket.join(canal);
    if (user) socket.broadcast.to(canal).emit('nuevoSubcriptor', user);
  });

  socket.on('codeoEvent', function(data) {
    socket.broadcast.to(data.canal).emit('codeoEmit', data);


  })
}

)
