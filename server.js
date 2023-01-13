const express = require('express');

const app = express();

const PORT = 3000;

const users = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe2',
  }
];

app.use((req, res, next) => {
  const middlewareMsg = `Middleware: \n 'Time:', ${Date.now()} \n 'Method:', ${req.method} \n 'URL:', ${req.url} \n 'IP:', ${req.ip} \n`;

  console.log(middlewareMsg);
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));

  if (user) {
    return res.json(user);
  } else {
      res.status(404).json({
      error: 'User not found'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

