const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./src/routes/user.route'));
app.use('/todo', require('./src/routes/todo.route'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});