// Create web server application
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Enable CORS
app.use(cors());

// Enable body-parser
app.use(bodyParser.json());

// In-memory data
const commentsByPostId = {};

// Define routes
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Get comments from in-memory data
  const comments = commentsByPostId[req.params.id] || [];

  // Push new comment to comments array
  comments.push({ id: commentId, content });

  // Update in-memory data
  commentsByPostId[req.params.id] = comments;

  // Return new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});