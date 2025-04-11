const express = require(`express`);
const cors = require(`cors`);
const userRoutes = require(`./routes/user-routes`)
const taskRoutes = require(`./routes/task-routes`)
const sessionRoutes = require(`./routes/session-routes`)

require(`dotenv`).config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.use(`/users`, userRoutes);
app.use(`/tasks`, taskRoutes);
app.use(`/sessions`, sessionRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});