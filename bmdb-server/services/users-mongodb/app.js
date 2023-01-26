const express = require('express');
const app = express();
const cors = require('cors');
const port = 4001
const { establishConnection } = require('./config/mongoConnection');
const router = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

establishConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`User service listening at http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })