// controller.js
const User = require('./models/userModel');
const Post = require('./models/postModel');

async function handleRequest(req, res) {
  res.setHeader('Content-Type', 'application/json');

  // ====== USERS ======
  if (req.url === '/users' && req.method === 'GET') {
    const users = await User.find();
    res.writeHead(200);
    res.end(JSON.stringify(users));

  } else if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newUser = new User(data);
        const savedUser = await newUser.save();
        res.writeHead(201);
        res.end(JSON.stringify(savedUser));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err.message }));
      }
    });

  // ====== POSTS ======
  } else if (req.url === '/posts' && req.method === 'GET') {
    try {
      const posts = await Post.find().populate('author', 'name email');
      res.writeHead(200);
      res.end(JSON.stringify(posts));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }

  } else if (req.url === '/posts' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newPost = new Post(data);
        const savedPost = await newPost.save();
        res.writeHead(201);
        res.end(JSON.stringify(savedPost));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err.message }));
      }
    });

  // ====== 404 ======
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
}

module.exports = handleRequest;
