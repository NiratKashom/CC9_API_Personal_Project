require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const scheduleFlightRoute = require('./routes/scheduleFlightRoute');
const serviceRoute = require('./routes/serviceRoute');

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

app.use('/schedule-flight', scheduleFlightRoute);
app.use('/service', serviceRoute);

app.listen(port, () => console.log('server is running on port: ' + port));



