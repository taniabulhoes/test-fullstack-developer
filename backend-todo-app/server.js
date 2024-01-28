const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/api/status', (_req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 2001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
