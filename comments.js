// create web server with express
const express = require('express');
const app = express();
// create server with http
const http = require('http');
const server = http.createServer(app);
// create socket server
const socketIO = require('socket.io');
const io = socketIO(server);
// create router
const router = express.Router();
// create body parser
const bodyParser = require('body-parser');
// create cors
const cors = require('cors');
// create mongoose
const mongoose = require('mongoose');
// create config
const config = require('./config/database');
// create path
const path = require('path');
// create authentication middleware
const authentication = require('./middleware/authentication');
// create routes
const comments = require('./routes/comments');
const users = require('./routes/users');
const posts = require('./routes/posts');
const likes = require('./routes/likes');
const friends = require('./routes/friends');
const conversations = require('./routes/conversations');
const messages = require('./routes/messages');
// create port
const port = process.env.PORT || 3000;
// connect to database
mongoose.connect(config.database);
// on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
// use body parser
app.use(bodyParser.json());
// use cors
app.use(cors());
// use authentication
app.use(authentication);
// use routes
app.use('/comments', comments);
app.use('/users', users);
app.use('/posts', posts);
app.use('/likes', likes);
app.use('/friends', friends);
app.use('/conversations', conversations);
app.use('/messages', messages);
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
// start server
server.listen(port, () => {
    console.log('Server started on port ' + port);
});
// socket io
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('comment', (comment) => {
        io.emit('comment', comment);
    });
    socket.on('like', (like) => {
        io.emit('like', like);
    });
    socket.on('friend', (friend) => {
        io.emit('friend', friend);
    }   );
