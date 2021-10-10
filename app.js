require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
// const { readFile, writeFile } = require('fs/promises');

// sync mysql
// const { sequelize } = require('./models');
// sequelize.sync();

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


// id: {
//   type: Datatypes.STRING,
//     allowNull: false,
//       unique: true,
//         primaryKey: true;
// },
// departureDate: {
//   type: Datatypes.DATE,
//     allowNull: false,
// },
// arrivalDate: {
//   type: Datatypes.DATE,
//     allowNull: false,
// },
// returnDate: {
//   type: Datatypes.DATE,
//     allowNull: false,
// },
// departure: {
//   type: Datatypes.STRING,
//     allowNull: false,
// },
// destination: {
//   type: Datatypes.STRING,
//     allowNull: false,
// }
