require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
// const { readFile, writeFile } = require('fs/promises');

// sync mysql
// const { sequelize } = require('./models');
// sequelize.sync({ force: true });


const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Connected Server');
});

// auth route
app.use('/', authRoute);


app.listen(port, () => console.log('server is running on port: ' + port));