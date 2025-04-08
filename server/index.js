require("dotenv").config();
const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

const userRoutes = require('./routes/user-routes')
const taskRoutes = require('./routes/task-routes')
const sessionRoutes = require('./routes/session-routes')

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/sessions', sessionRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});