require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoute');
const { readFile, writeFile } = require('fs/promises');

// sync mysql
// const { sequelize } = require('./models');
// sequelize.sync();


const port = process.env.PORT;

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Connected Server');
// });

// auth route
app.use('/', authRoute);

// app.get('/users', async (req, res) => {
//   try {
//     const result = await readFile(pathUsers, 'utf8');
//     const data = JSON.parse(result);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/users', async (req, res) => {
//   try {
//     const body = req.body;
//     const result = await readFile(pathUsers, 'utf8');
//     const fectchUsers = JSON.parse(result);
//     fectchUsers.push(body);

//     await writeFile(pathUsers, JSON.stringify(fectchUsers));

//     res.status(201).json({ message: 'create user success' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.listen(port, () => console.log('server is running on port: ' + port));