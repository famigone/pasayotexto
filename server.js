
require('dotenv').config();
const express = require ('express');
const routes = require('./routes/experiencia'); // import the routes
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const app = express()
const apiPort = 3000



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', routes); //to use the routes

const server = app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
const io = require('socket.io')(server);
//webSockets
io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //este evento es el que captura el coding
  socket.on('canalIn', function(data) {
    socket.join(data.canal);
    console.log('canalIn: ' + data.canal);
  });

  socket.on('codeoEvent', function(data) {
    console.log('emitiendo al canal: ' + data.canal+ ' el code '  + data.newCode);
    socket.broadcast.to(data.canal).emit('codeoEmit', data);

  })
}
)
