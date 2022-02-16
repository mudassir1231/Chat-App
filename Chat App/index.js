const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


const users ={};

io.on('connection', (socket) => {

  
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message',{ msg: msg, name:users[socket.id]});
        // console.log(users[socket.id] + ' : ' + msg);
  });



  socket.on('newuser',(name)=>{
        
    // console.log(name);
    users[socket.id]=name;
    socket.broadcast.emit('user joined',name);
    // console.log(users[socket.id] + 'joined');      
});


});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
